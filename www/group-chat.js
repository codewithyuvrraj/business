// Group Chat Manager - Instant Messaging for Groups
class GroupChatManager {
    constructor() {
        this.currentGroup = null;
        this.pollInterval = null;
    }

    async startGroupChat(groupId) {
        if (!window.authManager || !window.authManager.currentUser) return;
        try {
            let group;
            const { data, error } = await window.supabaseClient
                .from('groups')
                .select('id,name,photo_url,description,creator_id,is_private')
                .eq('id', groupId)
                .single();
            if (error || !data) throw new Error('Group not found');
            group = data;

            this.currentGroup = {
                id: groupId,
                name: group.name,
                photo_url: group.photo_url,
                creator_id: group.creator_id,
                is_private: group.is_private || false,
                conversationId: 'group_' + groupId,
                isChannel: false
            };

            this.showGroupChat();
            this.updateGroupHeader();
            await this.loadGroupMessages();
            this.startPolling();
        } catch (error) {
            console.error('Start group chat error:', error);
            window.authManager.showNotification('Failed to open group chat', 'error');
        }
    }

    showGroupChat() {
        const homeFeed = document.getElementById('homeFeed');
        const businessTools = document.getElementById('businessTools');
        const chatMessages = document.getElementById('chatMessages');
        const chatInputContainer = document.getElementById('chatInputContainer');
        const backBtn = document.getElementById('backBtn');
        
        if (homeFeed) homeFeed.style.display = 'none';
        if (businessTools) businessTools.style.display = 'none';
        if (chatMessages) chatMessages.style.display = 'flex';
        if (chatInputContainer) chatInputContainer.style.display = 'block';
        if (backBtn) backBtn.style.display = 'block';
        document.getElementById('headerSearchBtn')?.style.setProperty('display','none');
        document.getElementById('accountBtn')?.parentElement.style.setProperty('display','none');
        document.getElementById('menuToggle')?.style.setProperty('display','none');
        
        setTimeout(() => {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) messageInput.focus();
        }, 100);
    }

    updateGroupHeader() {
        const chatTitle = document.getElementById('chatTitle');
        const chatStatus = document.getElementById('chatStatus');
        const chatActions = document.querySelector('.chat-actions');
        if (chatTitle) {
            const avatar = this.currentGroup.photo_url
                ? `<img src="${this.currentGroup.photo_url}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;margin-right:8px;vertical-align:middle;">`
                : `<span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;margin-right:8px;vertical-align:middle;">${this.currentGroup.name.charAt(0).toUpperCase()}</span>`;
            chatTitle.innerHTML = avatar + this.currentGroup.name;
            chatTitle.style.cursor = 'pointer';
            chatTitle.onclick = () => this.showGroupMembers();
        }
        if (chatStatus) {
            chatStatus.innerHTML = '<i class="fas fa-users" style="color:#10b981;font-size:10px;margin-right:4px;"></i> Group';
        }
        // Show settings button for all members
        const existingBtn = document.getElementById('groupSettingsBtn');
        if (existingBtn) existingBtn.remove();
        const uid = window.authManager?.currentUser?.id;
        if (chatActions && uid) {
            const isOwner = this.currentGroup.creator_id === uid;
            const btn = document.createElement('button');
            btn.id = 'groupSettingsBtn';
            btn.className = 'btn btn-icon';
            btn.title = isOwner ? 'Group Settings' : 'Group Info';
            btn.style.cssText = 'margin-right:4px;';
            btn.innerHTML = `<i class="fas fa-${isOwner ? 'cog' : 'info-circle'}" style="font-size:18px;"></i>`;
            btn.onclick = () => this.showGroupSettings();
            chatActions.insertBefore(btn, chatActions.firstChild);
        }
    }

    async loadGroupMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        container.innerHTML = '<div style="text-align:center;padding:20px;color:#667781;"><i class="fas fa-spinner fa-spin"></i></div>';
        try {
            const col = this.currentGroup.isChannel ? 'channel_id' : 'group_id';
            const { data, error } = await window.supabaseClient
                .from('messages')
                .select('id,sender_id,content,created_at,type')
                .eq(col, this.currentGroup.id)
                .eq('is_deleted', false)
                .order('created_at', { ascending: true });
            if (error) throw error;
            const msgs = data || [];
            // fetch sender profiles
            const senderIds = [...new Set(msgs.map(m => m.sender_id))];
            let profiles = {};
            if (senderIds.length > 0 && window.isNhostEnabled) {
                const { data: pd } = await window.nhost.graphql.request(
                    `query GetProfiles($ids:[uuid!]!){profiles(where:{id:{_in:$ids}}){id full_name username avatar_url profile_picture_url}}`,
                    { ids: senderIds }
                );
                (pd?.profiles || []).forEach(p => { profiles[p.id] = p; });
            }
            const messages = msgs.map(m => ({
                id: m.id,
                text: m.content,
                type: m.type,
                sender_id: m.sender_id,
                created_at: m.created_at,
                sender: profiles[m.sender_id] || null
            }));
            this.displayGroupMessages(messages);
        } catch (error) {
            console.error('Error loading group messages:', error);
            container.innerHTML = '<div style="text-align:center;padding:20px;color:#e74c3c;">Error loading messages</div>';
        }
    }

    displayGroupMessages(messages) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        if (messages.length === 0) {
            container.innerHTML = `<div style="text-align: center; padding: 40px; color: #667781;">Welcome to ${this.currentGroup.name}! Start the conversation.</div>`;
            return;
        }

        container.innerHTML = '';
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.innerHTML = this.createGroupMessageHTML(msg);
                const messageNode = messageEl.firstChild;
                
                container.appendChild(messageNode);
                
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        container.scrollTo({
                            top: container.scrollHeight,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }, index * 30);
        });
    }

    createGroupMessageHTML(msg) {
        if ((msg.text || '').startsWith('\u200b')) {
            const display = (msg.text || '').slice(1);
            const icon = display.includes('removed') ? 'fa-user-minus' : 'fa-user-plus';
            return `<div data-message-id="${msg.id}" style="display:flex;justify-content:center;margin:10px 0;">
                <span style="background:rgba(0,0,0,0.06);color:#6b7280;font-size:12px;padding:5px 14px;border-radius:20px;text-align:center;max-width:80%;">
                    <i class="fas ${icon}" style="color:#10b981;margin-right:5px;font-size:10px;"></i>${this.escapeHtml(display)}
                </span>
            </div>`;
        }
        const isOwn = msg.sender_id === window.authManager.currentUser.id;
        const time = new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        const senderData = msg.sender || window.authManager.currentUser;
        const name = senderData.full_name || senderData.username;
        const profilePhoto = senderData.avatar_url || senderData.profile_photo;
        
        const avatarContent = profilePhoto ? 
            `<img src="${profilePhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` :
            this.escapeHtml((name || 'U').charAt(0).toUpperCase());
        
        return `<div class="message ${isOwn ? 'own' : ''}" data-message-id="${msg.id}">
               ${isOwn ? '' : `<div class="message-avatar">${avatarContent}</div>`}
               <div class="message-content">
               ${!isOwn ? `<div style="font-size: 12px; color: #10b981; font-weight: 600; margin-bottom: 2px;">${name}</div>` : ''}
               <div class="message-text">${this.escapeHtml(msg.text || '')}</div>
               <div class="message-time">${time}</div>
               </div></div>`;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async sendGroupMessage() {
        const input = document.getElementById('messageInput');
        if (!input) return;
        // Block non-owners from sending in readonly channels
        if (this.currentGroup?.is_readonly && this.currentGroup?.isChannel) {
            const uid = window.authManager.currentUser.id;
            if (uid !== this.currentGroup.creator_id) {
                window.authManager.showNotification('Only the owner can send messages in this channel', 'error');
                return;
            }
        }
        const text = input.value.trim();
        if (!text || !this.currentGroup) return;

        input.value = '';

        const tempMsg = {
            id: 'temp-' + Date.now(),
            sender_id: window.authManager.currentUser.id,
            text: text,
            created_at: new Date().toISOString(),
            sender: window.authManager.currentUser
        };

        this.addGroupMessageToUI(tempMsg);

        try {
            const { data, error } = await window.supabaseClient
                .from('messages')
                .insert({
                    [this.currentGroup.isChannel ? 'channel_id' : 'group_id']: this.currentGroup.id,
                    sender_id: window.authManager.currentUser.id,
                    content: text,
                    type: this.currentGroup.isChannel ? 'channel' : 'group',
                    is_deleted: false
                });
            if (error) console.error('Send group message error:', error);
        } catch (error) {
            console.error('Send group message error:', error);
            const element = document.querySelector('[data-message-id="' + tempMsg.id + '"]');
            if (element) element.remove();
            input.value = text;
        }
    }

    addGroupMessageToUI(msg) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        if (container.innerHTML.includes('Start the conversation')) {
            container.innerHTML = '';
        }

        if (document.querySelector('[data-message-id="' + msg.id + '"]')) return;

        const messageEl = document.createElement('div');
        messageEl.innerHTML = this.createGroupMessageHTML(msg);
        const messageNode = messageEl.firstChild;
        
        messageNode.style.opacity = '0';
        messageNode.style.transform = 'translateY(10px)';
        
        container.appendChild(messageNode);
        
        requestAnimationFrame(() => {
            messageNode.style.transition = 'all 0.3s ease-out';
            messageNode.style.transform = 'translateY(0)';
            messageNode.style.opacity = '1';
        });
        
        setTimeout(() => {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    startPolling() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = setInterval(async () => {
            if (!this.currentGroup) return;
            try {
                const { data, error } = await window.supabaseClient
                    .from('messages')
                    .select('id,sender_id,content,created_at,type')
                    .eq(this.currentGroup.isChannel ? 'channel_id' : 'group_id', this.currentGroup.id)
                    .eq('is_deleted', false)
                    .order('created_at', { ascending: false })
                    .limit(10);
                if (error || !data) return;
                data.reverse().forEach(msg => {
                    if (!document.querySelector('[data-message-id="' + msg.id + '"]')) {
                        this.addGroupMessageToUI({
                            id: msg.id,
                            text: msg.content,
                            type: msg.type,
                            sender_id: msg.sender_id,
                            created_at: msg.created_at,
                            sender: null
                        });
                    }
                });
            } catch (e) { /* silent */ }
        }, 2000);
    }

    stopPolling() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
    }

    async showGroupSettings() {
        if (!this.currentGroup) return;
        const isChannel = this.currentGroup.isChannel;
        const table = isChannel ? 'channel_members' : 'group_members';
        const col = isChannel ? 'channel_id' : 'group_id';
        try {
            const { data: memberRows, error } = await window.supabaseClient
                .from(table).select('user_id').eq(col, this.currentGroup.id);
            if (error) throw error;
            const userIds = (memberRows || []).map(r => r.user_id);
            let memberProfiles = [];
            if (userIds.length > 0 && window.isNhostEnabled) {
                const { data: pd } = await window.nhost.graphql.request(
                    `query GetProfiles($ids:[uuid!]!){profiles(where:{id:{_in:$ids}}){id full_name username avatar_url profile_picture_url job_title}}`,
                    { ids: userIds }
                );
                memberProfiles = pd?.profiles || [];
            }
            this._renderGroupSettingsModal(memberProfiles);
        } catch (e) {
            console.error(e);
            window.authManager.showNotification('Failed to load settings', 'error');
        }
    }

    _renderGroupSettingsModal(members) {
        document.getElementById('groupSettingsModal')?.remove();
        const uid = window.authManager.currentUser.id;
        const isOwner = this.currentGroup.creator_id === uid;
        const isChannel = this.currentGroup.isChannel;
        const label = isChannel ? 'Channel' : 'Group';
        const color = isChannel ? '#8b5cf6' : '#10b981';
        const modal = document.createElement('div');
        modal.id = 'groupSettingsModal';
        modal.className = 'overlay';
        modal.innerHTML = `
            <div class="settings-modal" style="max-width:520px;max-height:90vh;">
                <div class="settings-header" style="background:${isOwner ? `linear-gradient(135deg,${color},${isChannel?'#6d28d9':'#059669'})` : color};color:white;">
                    <h3><i class="fas fa-${isOwner?'cog':'info-circle'}"></i> ${this.currentGroup.name} — ${isOwner ? 'Settings' : 'Info'}</h3>
                    <button class="close-btn" onclick="document.getElementById('groupSettingsModal').remove()" style="color:white;"><i class="fas fa-times"></i></button>
                </div>
                <div class="settings-content" style="max-height:75vh;overflow-y:auto;padding:16px;">
                    ${isOwner ? `
                    <div style="margin-bottom:20px;">
                        <div style="font-weight:700;font-size:14px;color:#374151;margin-bottom:10px;"><i class="fas fa-user-plus" style="color:${color};"></i> Add Member</div>
                        <input id="gsAddInput" type="text" placeholder="Search by username or name..." style="width:100%;padding:10px 14px;border:1.5px solid #d1fae5;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box;" oninput="window.groupChatManager._gsSearch(this.value)">
                        <div id="gsSearchResults" style="margin-top:8px;"></div>
                    </div>
                    <div style="margin-bottom:20px;padding:14px;background:#f8fafc;border-radius:10px;border:1.5px solid #e5e7eb;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${isChannel ? '12px' : '0'};">
                            <div>
                                <div style="font-weight:700;font-size:14px;color:#374151;"><i class="fas fa-lock" style="color:#f59e0b;margin-right:6px;"></i>Private ${label}</div>
                                <div style="font-size:12px;color:#6b7280;margin-top:3px;">Only approved members can join. Others must send a request.</div>
                            </div>
                            <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;flex-shrink:0;margin-left:12px;">
                                <input type="checkbox" id="gsPrivateToggle" ${this.currentGroup.is_private ? 'checked' : ''} onchange="window.groupChatManager._togglePrivate(this.checked)" style="opacity:0;width:0;height:0;">
                                <span id="gsPrivateTrack" style="position:absolute;inset:0;background:${this.currentGroup.is_private ? '#f59e0b' : '#d1d5db'};border-radius:24px;transition:background 0.2s;"></span>
                                <span id="gsPrivateThumb" style="position:absolute;top:3px;left:${this.currentGroup.is_private ? '23px' : '3px'};width:18px;height:18px;background:white;border-radius:50%;transition:left 0.2s;"></span>
                            </label>
                        </div>
                        ${isChannel ? `
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-top:12px;border-top:1px solid #e5e7eb;">
                            <div>
                                <div style="font-weight:700;font-size:14px;color:#374151;"><i class="fas fa-comment-slash" style="color:#8b5cf6;margin-right:6px;"></i>Disable Chat</div>
                                <div style="font-size:12px;color:#6b7280;margin-top:3px;">Only you can send. Members can still view.</div>
                            </div>
                            <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;flex-shrink:0;margin-left:12px;">
                                <input type="checkbox" id="gsReadonlyToggle" ${this.currentGroup.is_readonly ? 'checked' : ''} onchange="window.groupChatManager._toggleReadonly(this.checked)" style="opacity:0;width:0;height:0;">
                                <span id="gsReadonlyTrack" style="position:absolute;inset:0;background:${this.currentGroup.is_readonly ? '#8b5cf6' : '#d1d5db'};border-radius:24px;transition:background 0.2s;"></span>
                                <span id="gsReadonlyThumb" style="position:absolute;top:3px;left:${this.currentGroup.is_readonly ? '23px' : '3px'};width:18px;height:18px;background:white;border-radius:50%;transition:left 0.2s;"></span>
                            </label>
                        </div>
` : ''}
                    </div>
                    ` : ''}
                    <div style="font-weight:700;font-size:14px;color:#374151;margin-bottom:10px;"><i class="fas fa-users" style="color:${color};"></i> Members (${members.length})</div>
                    <div id="gsMemberList">
                        ${members.map(m => this._gsMemberRow(m, isOwner)).join('')}
                    </div>
                    ${!isOwner ? `
                    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f3f4f6;">
                        <button onclick="window.groupChatManager._leaveGroup()" style="width:100%;background:#fee2e2;color:#dc2626;border:none;padding:12px;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;">
                            <i class="fas fa-sign-out-alt"></i> Leave ${label}
                        </button>
                    </div>` : ''}
                </div>
            </div>`;
        document.body.appendChild(modal);
    }

    _gsMemberRow(m, isOwner = false) {
        const isCreator = m.id === this.currentGroup.creator_id;
        const isMe = m.id === window.authManager.currentUser.id;
        const pic = (m.avatar_url || m.profile_picture_url)
            ? `<img src="${m.avatar_url || m.profile_picture_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
            : (m.full_name || m.username || '?').charAt(0).toUpperCase();
        return `
            <div id="gsRow_${m.id}" style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:10px;margin-bottom:8px;border-left:4px solid ${isCreator?'#f59e0b':'#10b981'};">
                <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:15px;overflow:hidden;flex-shrink:0;">${pic}</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:14px;color:#1f2937;">${m.full_name || m.username} ${isCreator ? '<span style="background:#fef3c7;color:#d97706;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;">Owner</span>' : ''}</div>
                    <div style="color:#6b7280;font-size:12px;">@${m.username}</div>
                </div>
                ${(isOwner && !isCreator && !isMe) ? `<button onclick="window.groupChatManager._gsRemoveMember('${m.id}')" style="background:#fee2e2;color:#dc2626;border:none;padding:7px 12px;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;"><i class="fas fa-user-minus"></i> Remove</button>` : ''}
            </div>`;
    }

    _gsSelectedUserId = null;

    async _gsSearch(query) {
        const resultsEl = document.getElementById('gsSearchResults');
        if (!query || query.length < 2) { resultsEl.innerHTML = ''; return; }
        try {
            const { data: pd } = await window.nhost.graphql.request(
                `query Search($q:String!){profiles(where:{_or:[{username:{_ilike:$q}},{full_name:{_ilike:$q}}]},limit:5){id full_name username avatar_url profile_picture_url}}`,
                { q: `%${query}%` }
            );
            const results = (pd?.profiles || []);
            resultsEl.innerHTML = results.length === 0 ? `<div style="color:#9ca3af;font-size:13px;padding:6px;">No users found</div>` :
                results.map(u => `
                    <div onclick="window.groupChatManager._gsAddUserById('${u.id}','${(u.full_name||u.username).replace(/'/g,"&#39;")}')"
                        style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;background:#f0fdf4;margin-bottom:4px;border:1.5px solid transparent;"
                        onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='transparent'">
                        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;overflow:hidden;">
                            ${(u.avatar_url||u.profile_picture_url)?`<img src="${u.avatar_url||u.profile_picture_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`:(u.full_name||u.username||'?').charAt(0).toUpperCase()}
                        </div>
                        <div><div style="font-weight:600;font-size:13px;color:#1f2937;">${u.full_name||u.username}</div><div style="color:#6b7280;font-size:11px;">@${u.username} — click to add</div></div>
                    </div>`).join('');
        } catch(e) { console.error(e); }
    }

    async _gsAddUserById(userId, userName) {
        const isChannel = this.currentGroup.isChannel;
        const added = isChannel ? await this.addUserToChannel(this.currentGroup.id, userId) : await this.addUserToGroup(this.currentGroup.id, userId);
        if (added) {
            const input = document.getElementById('gsAddInput');
            if (input) input.value = '';
            const resultsEl = document.getElementById('gsSearchResults');
            if (resultsEl) resultsEl.innerHTML = '';
            const me = window.authManager.currentUser;
            const myProfile = await this._getMyProfile(me.id);
            const myName = myProfile?.full_name || myProfile?.username || 'Admin';
            await this._sendSystemMessage(`${myName} added ${userName} to the ${isChannel ? 'channel' : 'group'}`);
            await this.loadGroupMessages();
            await this.showGroupSettings();
        }
    }

    async _sendSystemMessage(text) {
        const col = this.currentGroup.isChannel ? 'channel_id' : 'group_id';
        await window.supabaseClient.from('messages').insert({
            [col]: this.currentGroup.id,
            sender_id: window.authManager.currentUser.id,
            type: this.currentGroup.isChannel ? 'channel' : 'group',
            content: '\u200b' + text,
            is_deleted: false
        });
    }

    async _getMyProfile(userId) {
        try {
            const { data: pd } = await window.nhost.graphql.request(
                `query GetProfile($id:uuid!){profiles(where:{id:{_eq:$id}}){id full_name username}}`,
                { id: userId }
            );
            return pd?.profiles?.[0] || null;
        } catch(e) { return null; }
    }

    async _togglePrivate(enabled) {
        try {
            const table = this.currentGroup.isChannel ? 'channels' : 'groups';
            const { error } = await window.supabaseClient
                .from(table).update({ is_private: enabled }).eq('id', this.currentGroup.id);
            if (error) throw error;
            this.currentGroup.is_private = enabled;
            const track = document.getElementById('gsPrivateTrack');
            const thumb = document.getElementById('gsPrivateThumb');
            if (track) track.style.background = enabled ? '#f59e0b' : '#d1d5db';
            if (thumb) thumb.style.left = enabled ? '23px' : '3px';
            const label = this.currentGroup.isChannel ? 'Channel' : 'Group';
            window.authManager.showNotification(
                enabled ? label + ' is now private — members must request to join' : label + ' is now public — anyone can join',
                'success'
            );
        } catch(e) {
            console.error(e);
            window.authManager.showNotification('Failed to update privacy setting', 'error');
        }
    }

    async _toggleReadonly(enabled) {
        try {
            const { error } = await window.supabaseClient
                .from('channels').update({ is_readonly: enabled }).eq('id', this.currentGroup.id);
            if (error) throw error;
            this.currentGroup.is_readonly = enabled;
            this._updateReadonlyUI();
            // Update toggle visuals
            const track = document.getElementById('gsReadonlyTrack');
            const thumb = document.getElementById('gsReadonlyThumb');
            if (track) track.style.background = enabled ? '#8b5cf6' : '#d1d5db';
            if (thumb) thumb.style.left = enabled ? '23px' : '3px';
            window.authManager.showNotification(enabled ? 'Chat disabled — only you can send messages' : 'Chat enabled for all members', 'success');
        } catch(e) {
            console.error(e);
            window.authManager.showNotification('Failed to update channel setting', 'error');
        }
    }



    _updateReadonlyUI() {
        const container = document.getElementById('chatInputContainer');
        if (!container) return;
        const uid = window.authManager?.currentUser?.id;
        const isOwner = uid === this.currentGroup?.creator_id;
        const isReadonly = this.currentGroup?.is_readonly && this.currentGroup?.isChannel;
        // Remove existing readonly banner if any
        document.getElementById('readonlyBanner')?.remove();
        if (isReadonly && !isOwner) {
            container.style.display = 'block';
            container.innerHTML = '<div id="readonlyBanner" style="padding:14px 20px;text-align:center;color:#6b7280;font-size:13px;background:#f8fafc;border-top:1px solid #e5e7eb;"><i class=\"fas fa-lock\" style=\"color:#8b5cf6;margin-right:6px;\"></i>Only the channel owner can send messages</div>';
        } else {
            container.innerHTML = '<div class="chat-input"><button class="attachment-btn" id="attachFileBtn"><i class="fas fa-plus"></i></button><input type="text" id="messageInput" placeholder="Type a message"><button id="sendMessageBtn"><i class="fas fa-paper-plane"></i></button></div>';
            // Re-bind send button
            const sendBtn = document.getElementById('sendMessageBtn');
            const msgInput = document.getElementById('messageInput');
            if (sendBtn) sendBtn.onclick = () => window.groupChatManager.sendGroupMessage();
            if (msgInput) {
                msgInput.onkeypress = (e) => { if (e.key === 'Enter') window.groupChatManager.sendGroupMessage(); };
                msgInput.focus();
            }
        }
    }

    async _leaveGroup() {
        const label = this.currentGroup.isChannel ? 'channel' : 'group';
        if (!confirm(`Leave this ${label}?`)) return;
        const table = this.currentGroup.isChannel ? 'channel_members' : 'group_members';
        const col = this.currentGroup.isChannel ? 'channel_id' : 'group_id';
        const uid = window.authManager.currentUser.id;
        try {
            const { error } = await window.supabaseClient
                .from(table).delete().eq(col, this.currentGroup.id).eq('user_id', uid);
            if (error) throw error;
            const myProfile = await this._getMyProfile(uid);
            const myName = myProfile?.full_name || myProfile?.username || 'A member';
            await this._sendSystemMessage(`${myName} left the ${label}`);
            document.getElementById('groupSettingsModal')?.remove();
            window.authManager.showNotification(`You left the ${label}`, 'success');
            window.authManager.goBackToHomeFeed();
        } catch(e) {
            console.error(e);
            window.authManager.showNotification(`Failed to leave ${label}`, 'error');
        }
    }

    async _gsRemoveMember(userId) {
        if (!confirm('Remove this member from the group?')) return;
        try {
            const removedProfile = await this._getMyProfile(userId);
            const removedName = removedProfile?.full_name || removedProfile?.username || 'A member';
            const { error } = await window.supabaseClient
                .from('group_members').delete()
                .eq('group_id', this.currentGroup.id).eq('user_id', userId);
            if (error) throw error;
            document.getElementById(`gsRow_${userId}`)?.remove();
            const me = window.authManager.currentUser;
            const myProfile = await this._getMyProfile(me.id);
            const myName = myProfile?.full_name || myProfile?.username || 'Admin';
            await this._sendSystemMessage(`​${myName} removed ${removedName} from the group`);
            await this.loadGroupMessages();
            window.authManager.showNotification('Member removed', 'success');
        } catch(e) {
            console.error(e);
            window.authManager.showNotification('Failed to remove member', 'error');
        }
    }

    async showGroupMembers() {
        if (!this.currentGroup) return;
        try {
            // Fetch members from Supabase
            const { data: memberRows, error } = await window.supabaseClient
                .from('group_members')
                .select('user_id')
                .eq('group_id', this.currentGroup.id);
            if (error) throw error;
            const userIds = (memberRows || []).map(r => r.user_id);
            let memberProfiles = [];
            if (userIds.length > 0 && window.isNhostEnabled) {
                const { data: pd } = await window.nhost.graphql.request(
                    `query GetProfiles($ids:[uuid!]!){profiles(where:{id:{_in:$ids}}){id full_name username avatar_url profile_picture_url job_title}}`,
                    { ids: userIds }
                );
                memberProfiles = pd?.profiles || [];
            }
            this.displayGroupMembersModal(memberProfiles);
        } catch (error) {
            console.error('Error loading group members:', error);
            window.authManager.showNotification('Failed to load members', 'error');
        }
    }
    
    displayGroupMembersModal(members) {
        const modal = document.createElement('div');
        modal.className = 'overlay';
        modal.innerHTML = `
            <div class="settings-modal" style="max-width: 500px; max-height: 90vh;">
                <div class="settings-header" style="background: #10b981; color: white;">
                    <h3><i class="fas fa-users"></i> ${this.currentGroup.name} Members</h3>
                    <button class="close-btn" onclick="this.closest('.overlay').remove()" style="color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="settings-content" style="max-height: 70vh; overflow-y: auto;">
                    ${members.length === 0 ? `
                        <div style="text-align: center; padding: 40px 20px; color: #6b7280;">
                            <i class="fas fa-users" style="font-size: 48px; margin-bottom: 16px;"></i>
                            <h3>No Members Found</h3>
                            <p>This group has no members yet.</p>
                        </div>
                    ` : `
                        ${members.map(member => `
                            <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8fafc; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #10b981;">
                                <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px; overflow: hidden;">
                                    ${(member.avatar_url || member.profile_picture_url) ? 
                                        `<img src="${member.avatar_url || member.profile_picture_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` :
                                        (member.full_name || member.username || '?').charAt(0).toUpperCase()
                                    }
                                </div>
                                <div style="flex: 1; min-width: 0;">
                                    <div style="font-weight: 600; font-size: 16px; color: #1f2937; margin-bottom: 4px;">${member.full_name || member.username}</div>
                                    <div style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">@${member.username}</div>
                                    ${member.job_title ? `<div style="color: #10b981; font-size: 12px; font-weight: 500;"><i class="fas fa-briefcase"></i> ${member.job_title}</div>` : ''}
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    ${member.id !== window.authManager.currentUser.id ? `
                                        <button onclick="window.authManager.checkMessageLockAndStart('${member.id}'); this.closest('.overlay').remove();" style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                            <i class="fas fa-comment"></i> Message
                                        </button>
                                        <button onclick="window.groupChatManager.followMemberFromGroup('${member.id}')" style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                            <i class="fas fa-user-plus"></i> Follow
                                        </button>
                                    ` : `
                                        <div style="background: #f3f4f6; color: #6b7280; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                                            <i class="fas fa-crown"></i> You
                                        </div>
                                    `}
                                </div>
                            </div>
                        `).join('')}
                    `}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    async followMemberFromGroup(userId) {
        try {
            if (window.isNhostEnabled) {
                const { error } = await window.nhost.graphql.request(`
                    mutation FollowUser($follower_id: uuid!, $following_id: uuid!) {
                        insert_followers_one(object: {follower_id: $follower_id, following_id: $following_id}) {
                            id
                        }
                    }
                `, {
                    follower_id: window.authManager.currentUser.id,
                    following_id: userId
                });
                
                if (error) {
                    if (error.message && error.message.includes('Uniqueness violation')) {
                        window.authManager.showNotification('You are already following this user', 'error');
                    } else {
                        throw error;
                    }
                    return;
                }
            } else {
                // Local fallback
                const localFollows = JSON.parse(localStorage.getItem('businessconnect_follows') || '[]');
                const existingFollow = localFollows.find(f => 
                    f.follower_id === window.authManager.currentUser.id && f.following_id === userId
                );
                
                if (existingFollow) {
                    window.authManager.showNotification('You are already following this user', 'error');
                    return;
                }
                
                localFollows.push({
                    id: Date.now().toString(),
                    follower_id: window.authManager.currentUser.id,
                    following_id: userId,
                    created_at: new Date().toISOString()
                });
                localStorage.setItem('businessconnect_follows', JSON.stringify(localFollows));
            }
            
            window.authManager.showNotification('User followed successfully!', 'success');
            
        } catch (error) {
            console.error('Follow error:', error);
            window.authManager.showNotification('Failed to follow user', 'error');
        }
    }
    
    // Add user to group and send notification
    async addUserToGroup(groupId, userId) {
        try {
            // Check if already a member
            const { data: existing } = await window.supabaseClient
                .from('group_members').select('id').eq('group_id', groupId).eq('user_id', userId).single();
            if (existing) {
                window.authManager.showNotification('User is already a member of this group', 'error');
                return false;
            }
            const { error } = await window.supabaseClient
                .from('group_members').insert({ group_id: groupId, user_id: userId });
            if (error) throw error;
            window.authManager.showNotification('User added to group successfully!', 'success');
            return true;
        } catch (error) {
            console.error('Error adding user to group:', error);
            window.authManager.showNotification('Failed to add user to group', 'error');
            return false;
        }
    }
    
    // Add user to channel and send notification  
    async addUserToChannel(channelId, userId) {
        try {
            const { data: existing } = await window.supabaseClient
                .from('channel_members').select('id').eq('channel_id', channelId).eq('user_id', userId).single();
            if (existing) {
                window.authManager.showNotification('User is already a member of this channel', 'error');
                return false;
            }
            const { error } = await window.supabaseClient
                .from('channel_members').insert({ channel_id: channelId, user_id: userId });
            if (error) throw error;
            window.authManager.showNotification('User added to channel successfully!', 'success');
            return true;
        } catch (error) {
            console.error('Error adding user to channel:', error);
            window.authManager.showNotification('Failed to add user to channel', 'error');
            return false;
        }
    }
    
    // Open group chat
    async openGroup(groupId) {
        await this.startGroupChat(groupId);
    }
    
    // Open channel
    async openChannel(channelId) {
        await this.startChannelChat(channelId);
    }

    async startChannelChat(channelId) {
        if (!window.authManager || !window.authManager.currentUser) return;
        try {
            const uid = window.authManager?.currentUser?.id;
            const { data, error } = await window.supabaseClient
                .from('channels')
                .select('id,name,photo_url,description,creator_id,is_readonly,is_private')
                .eq('id', channelId)
                .single();
            if (error || !data) throw new Error('Channel not found');

            // Block non-members from opening a private channel
            if (data.is_private && data.creator_id !== uid) {
                const { data: membership } = await window.supabaseClient
                    .from('channel_members').select('id').eq('channel_id', channelId).eq('user_id', uid).single();
                if (!membership) {
                    window.authManager.showNotification('This is a private channel. Request to join first.', 'error');
                    return;
                }
            }

            this.currentGroup = {
                id: channelId,
                name: data.name,
                photo_url: data.photo_url,
                creator_id: data.creator_id,
                is_readonly: data.is_readonly || false,
                is_private: data.is_private || false,
                conversationId: 'channel_' + channelId,
                isChannel: true
            };

            this.showGroupChat();
            const chatTitle = document.getElementById('chatTitle');
            if (chatTitle) {
                const avatar = data.photo_url
                    ? `<img src="${data.photo_url}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;margin-right:8px;vertical-align:middle;">`
                    : `<span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;margin-right:8px;vertical-align:middle;">${data.name.charAt(0).toUpperCase()}</span>`;
                chatTitle.innerHTML = avatar + data.name;
                chatTitle.style.cursor = 'pointer';
                chatTitle.onclick = () => this.showGroupSettings();
            }
            const chatStatus = document.getElementById('chatStatus');
            if (chatStatus) chatStatus.innerHTML = '<i class="fas fa-satellite-dish" style="color:#8b5cf6;font-size:10px;margin-right:4px;"></i> Channel';
            // Settings button for channel
            const existingBtn = document.getElementById('groupSettingsBtn');
            if (existingBtn) existingBtn.remove();
            const chatActions = document.querySelector('.chat-actions');
            if (chatActions && uid) {
                const isOwner = data.creator_id === uid;
                const btn = document.createElement('button');
                btn.id = 'groupSettingsBtn';
                btn.className = 'btn btn-icon';
                btn.title = isOwner ? 'Channel Settings' : 'Channel Info';
                btn.style.cssText = 'margin-right:4px;';
                btn.innerHTML = `<i class="fas fa-${isOwner?'cog':'info-circle'}" style="font-size:18px;"></i>`;
                btn.onclick = () => this.showGroupSettings();
                chatActions.insertBefore(btn, chatActions.firstChild);
            }

            await this.loadGroupMessages();
            this.startPolling();
            this._updateReadonlyUI();
        } catch (error) {
            console.error('Start channel chat error:', error);
            window.authManager.showNotification('Failed to open channel', 'error');
        }
    }
    
    // Create new group
    async createGroup(name, description = '', photoUrl = null) {
        try {
            if (window.isNhostEnabled) {
                const { data: groupData, error } = await window.nhost.graphql.request(`
                    mutation CreateGroup($group: groups_insert_input!) {
                        insert_groups_one(object: $group) {
                            id
                            name
                            photo_url
                            created_by
                            created_at
                        }
                    }
                `, {
                    group: {
                        name: name,
                        description: description,
                        photo_url: photoUrl,
                        created_by: window.authManager.currentUser.id
                    }
                });
                
                if (error) {
                    console.error('Nhost group creation error:', error);
                    throw error;
                }
                
                if (!groupData?.data?.insert_groups_one) {
                    throw new Error('No group data returned from Nhost');
                }
                
                const newGroup = groupData.insert_groups_one;
                
                // Add creator as first member
                await this.addUserToGroup(newGroup.id, window.authManager.currentUser.id);
                
                return newGroup;
            } else {
                // Local fallback
                const localGroups = JSON.parse(localStorage.getItem('businessconnect_groups') || '[]');
                const newGroup = {
                    id: Date.now().toString(),
                    name: name,
                    photo_url: photoUrl,
                    created_by: window.authManager.currentUser.id,
                    created_at: new Date().toISOString()
                };
                
                localGroups.push(newGroup);
                localStorage.setItem('businessconnect_groups', JSON.stringify(localGroups));
                
                // Add creator as first member
                const localMembers = [window.authManager.currentUser.id];
                localStorage.setItem(`group_members_${newGroup.id}`, JSON.stringify(localMembers));
                
                return newGroup;
            }
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }
    
    // Create new channel
    async createChannel(name, description = '', photoUrl = null) {
        try {
            if (window.isNhostEnabled) {
                const { data: channelData, error } = await window.nhost.graphql.request(`
                    mutation CreateChannel($channel: channels_insert_input!) {
                        insert_channels_one(object: $channel) {
                            id
                            name
                            photo_url
                            created_by
                            created_at
                        }
                    }
                `, {
                    channel: {
                        name: name,
                        description: description,
                        photo_url: photoUrl,
                        created_by: window.authManager.currentUser.id
                    }
                });
                
                if (error) {
                    console.error('Nhost channel creation error:', error);
                    throw error;
                }
                
                if (!channelData?.insert_channels_one) {
                    throw new Error('No channel data returned from Nhost');
                }
                
                const newChannel = channelData.insert_channels_one;
                
                // Add creator as first member
                await this.addUserToChannel(newChannel.id, window.authManager.currentUser.id);
                
                return newChannel;
            } else {
                // Local fallback
                const localChannels = JSON.parse(localStorage.getItem('businessconnect_channels') || '[]');
                const newChannel = {
                    id: Date.now().toString(),
                    name: name,
                    photo_url: photoUrl,
                    created_by: window.authManager.currentUser.id,
                    created_at: new Date().toISOString()
                };
                
                localChannels.push(newChannel);
                localStorage.setItem('businessconnect_channels', JSON.stringify(localChannels));
                
                // Add creator as first member
                const localMembers = [window.authManager.currentUser.id];
                localStorage.setItem(`channel_members_${newChannel.id}`, JSON.stringify(localMembers));
                
                return newChannel;
            }
        } catch (error) {
            console.error('Error creating channel:', error);
            throw error;
        }
    }

    cleanup() {
        this.stopPolling();
        this.currentGroup = null;
        
        const chatTitle = document.getElementById('chatTitle');
        const chatStatus = document.getElementById('chatStatus');
        const backBtn = document.getElementById('backBtn');
        
        if (chatTitle) {
            chatTitle.innerHTML = '<img src="logo.png" style="width:24px;height:24px;border-radius:50%;margin-right:8px;vertical-align:middle;"> BusinessConnect';
            chatTitle.style.cursor = 'default';
            chatTitle.style.textDecoration = 'none';
            chatTitle.onclick = null;
        }
        if (chatStatus) chatStatus.innerHTML = '';
        if (backBtn) backBtn.style.display = 'none';
        document.getElementById('readonlyBanner')?.remove();
        document.getElementById('groupSettingsBtn')?.remove();
        document.getElementById('headerSearchBtn')?.style.setProperty('display','');
        document.getElementById('accountBtn')?.parentElement.style.setProperty('display','');
        document.getElementById('menuToggle')?.style.setProperty('display','');
    }
}

// Initialize group chat manager
window.groupChatManager = new GroupChatManager();

