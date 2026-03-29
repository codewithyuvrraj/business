// ============================================================
// SUPABASE MESSAGING MANAGER
// Exact schema: id, sender_id, receiver_id, group_id,
//   channel_id, type, content, file_url, file_type,
//   file_name, file_size, is_read, is_deleted, created_at
// ============================================================

class SupabaseMessagingManager {
    constructor() {
        this.currentUser = null;
        this.activeSubscription = null;
    }

    get supabase() {
        if (!window.supabaseClient && window.supabase) {
            try {
                window.supabaseClient = window.supabase.createClient(
                    'https://mbvdirbpobgcclkmqvvg.supabase.co',
                    'sb_publishable_VvB5XRRQ7DPGcLo6pEghSA_mf3jBYXi'
                );
                window.isSupabaseEnabled = true;
            } catch(e) { console.error('Supabase lazy init failed:', e); }
        }
        return window.supabaseClient;
    }

    _assert() {
        if (!this.supabase) throw new Error('Supabase not available');
        if (!this.currentUser) throw new Error('Not authenticated');
    }

    init(currentUser) {
        this.currentUser = currentUser;
    }

    // ----------------------------------------------------------
    // SEND MESSAGE
    // ----------------------------------------------------------
    async sendMessage({ receiverId = null, groupId = null, channelId = null, content = null, fileUrl = null, fileType = null, fileName = null, fileSize = null }) {
        this._assert();

        const type = groupId ? 'group' : channelId ? 'channel' : 'direct';

        const payload = {
            sender_id:   this.currentUser.id,
            receiver_id: receiverId  || null,
            group_id:    groupId     || null,
            channel_id:  channelId   || null,
            type,
            content:     content     || null,
            file_url:    fileUrl     || null,
            file_type:   fileType    || null,
            file_name:   fileName    || null,
            file_size:   fileSize    || null,
        };

        // Log exact payload so we can confirm no extra columns are sent

        const { error } = await this.supabase
            .from('messages')
            .insert(payload);

        if (error) {
            console.error('[MSG] insert error:', error);
            throw error;
        }
        return { ...payload, id: `local_${Date.now()}`, is_read: false, is_deleted: false, created_at: new Date().toISOString() };
    }

    // ----------------------------------------------------------
    // LOAD DIRECT MESSAGES between two users
    // ----------------------------------------------------------
    async loadDirectMessages(otherUserId, limit = 50) {
        this._assert();

        const { data, error } = await this.supabase
            .from('messages')
            .select('id,sender_id,receiver_id,group_id,channel_id,type,content,file_url,file_type,file_name,file_size,is_read,is_deleted,created_at')
            .eq('type', 'direct')
            .or(`and(sender_id.eq.${this.currentUser.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${this.currentUser.id})`)
            .eq('is_deleted', false)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) throw error;
        return data || [];
    }

    // ----------------------------------------------------------
    // LOAD GROUP MESSAGES
    // ----------------------------------------------------------
    async loadGroupMessages(groupId, limit = 50) {
        this._assert();

        const { data, error } = await this.supabase
            .from('messages')
            .select('id,sender_id,receiver_id,group_id,channel_id,type,content,file_url,file_type,file_name,file_size,is_read,is_deleted,created_at')
            .eq('type', 'group')
            .eq('group_id', groupId)
            .eq('is_deleted', false)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) throw error;
        return data || [];
    }

    // ----------------------------------------------------------
    // LOAD CHANNEL MESSAGES
    // ----------------------------------------------------------
    async loadChannelMessages(channelId, limit = 50) {
        this._assert();

        const { data, error } = await this.supabase
            .from('messages')
            .select('id,sender_id,receiver_id,group_id,channel_id,type,content,file_url,file_type,file_name,file_size,is_read,is_deleted,created_at')
            .eq('type', 'channel')
            .eq('channel_id', channelId)
            .eq('is_deleted', false)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) throw error;
        return data || [];
    }

    // ----------------------------------------------------------
    // MARK MESSAGES AS READ
    // ----------------------------------------------------------
    async markAsRead(senderId) {
        if (!this.supabase || !this.currentUser) return;
        await this.supabase
            .from('messages')
            .update({ is_read: true })
            .eq('type', 'direct')
            .eq('sender_id', senderId)
            .eq('receiver_id', this.currentUser.id)
            .eq('is_read', false);
    }

    // ----------------------------------------------------------
    // GET UNREAD COUNT
    // ----------------------------------------------------------
    async getUnreadCount() {
        if (!this.supabase || !this.currentUser) return 0;
        const { count, error } = await this.supabase
            .from('messages')
            .select('id', { count: 'exact', head: true })
            .eq('receiver_id', this.currentUser.id)
            .eq('is_read', false)
            .eq('is_deleted', false);
        return error ? 0 : (count || 0);
    }

    // ----------------------------------------------------------
    // DELETE MESSAGE (soft delete)
    // ----------------------------------------------------------
    async deleteMessage(messageId) {
        this._assert();
        const { error } = await this.supabase
            .from('messages')
            .update({ is_deleted: true })
            .eq('id', messageId)
            .eq('sender_id', this.currentUser.id);
        if (error) throw error;
    }

    // ----------------------------------------------------------
    // REALTIME - Direct messages
    // ----------------------------------------------------------
    subscribeToDirectMessages(otherUserId, onMessage, onUpdate) {
        if (!this.supabase) return null;
        this.unsubscribe();

        this.activeSubscription = this.supabase
            .channel(`direct_${this.currentUser.id}_${otherUserId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `type=eq.direct`
            }, (payload) => {
                const msg = payload.new;
                const mine = this.currentUser.id;
                const relevant =
                    (msg.sender_id === mine && msg.receiver_id === otherUserId) ||
                    (msg.sender_id === otherUserId && msg.receiver_id === mine);
                if (relevant && onMessage) onMessage(msg);
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'messages',
                filter: `type=eq.direct`
            }, (payload) => {
                const msg = payload.new;
                const mine = this.currentUser.id;
                const relevant =
                    (msg.sender_id === mine && msg.receiver_id === otherUserId) ||
                    (msg.sender_id === otherUserId && msg.receiver_id === mine);
                if (relevant && onUpdate) onUpdate(msg);
            })
            .subscribe();

        return this.activeSubscription;
    }

    // ----------------------------------------------------------
    // REALTIME - Group messages
    // ----------------------------------------------------------
    subscribeToGroupMessages(groupId, onMessage) {
        if (!this.supabase) return null;
        this.unsubscribe();

        this.activeSubscription = this.supabase
            .channel(`group_${groupId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `group_id=eq.${groupId}`
            }, (payload) => {
                if (onMessage) onMessage(payload.new);
            })
            .subscribe();

        return this.activeSubscription;
    }

    // ----------------------------------------------------------
    // REALTIME - Channel messages
    // ----------------------------------------------------------
    subscribeToChannelMessages(channelId, onMessage) {
        if (!this.supabase) return null;
        this.unsubscribe();

        this.activeSubscription = this.supabase
            .channel(`channel_${channelId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `channel_id=eq.${channelId}`
            }, (payload) => {
                if (onMessage) onMessage(payload.new);
            })
            .subscribe();

        return this.activeSubscription;
    }

    // ----------------------------------------------------------
    // REALTIME - Watch for is_read updates on own sent messages
    // ----------------------------------------------------------
    subscribeToReadReceipts(otherUserId, onRead) {
        if (!this.supabase || !this.currentUser) return null;
        const channel = this.supabase
            .channel(`read_${this.currentUser.id}_${otherUserId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'messages',
                filter: `sender_id=eq.${this.currentUser.id}`
            }, (payload) => {
                if (payload.new.is_read && payload.new.receiver_id === otherUserId) {
                    if (onRead) onRead(payload.new.id);
                }
            })
            .subscribe();
        return channel;
    }

    // ----------------------------------------------------------
    // ----------------------------------------------------------
    unsubscribe() {
        if (this.activeSubscription && this.supabase) {
            this.supabase.removeChannel(this.activeSubscription);
            this.activeSubscription = null;
        }
    }

    // ----------------------------------------------------------
    // FILE MESSAGE - upload to Nhost, save URL in Supabase
    // ----------------------------------------------------------
    async sendFileMessage({ receiverId = null, groupId = null, channelId = null, file }) {
        if (!window.isNhostEnabled) throw new Error('Nhost storage not available');

        const ext = file.name.split('.').pop();
        const fileName = `msg_${this.currentUser.id}_${Date.now()}.${ext}`;
        const { fileMetadata, error: uploadError } = await window.nhost.storage.upload({ file, name: fileName });
        if (uploadError) throw uploadError;

        const fileUrl  = window.nhost.storage.getPublicUrl({ fileId: fileMetadata.id });
        const fileType = file.type.startsWith('image/') ? 'image'
                       : file.type.startsWith('video/') ? 'video'
                       : file.type.startsWith('audio/') ? 'audio'
                       : 'document';

        return await this.sendMessage({ receiverId, groupId, channelId, fileUrl, fileType, fileName: file.name, fileSize: file.size });
    }
}

window.messagingManager = new SupabaseMessagingManager();
