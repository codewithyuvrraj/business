// Groups and Channels Manager - Local and Nhost Integration
class GroupsChannelsManager {
    constructor() {
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;
        
        // Initialize local storage if needed
        if (!localStorage.getItem('businessconnect_groups')) {
            localStorage.setItem('businessconnect_groups', JSON.stringify([]));
        }
        if (!localStorage.getItem('businessconnect_channels')) {
            localStorage.setItem('businessconnect_channels', JSON.stringify([]));
        }
        
        this.initialized = true;
    }

    // Get all groups for current user
    async getMyGroups() {
        await this.initialize();
        
        if (!window.authManager?.currentUser) return [];
        
        if (window.isNhostEnabled) {
            try {
                const { data: groupsData, error } = await window.nhost.graphql.request(`
                    query GetMyGroups($userId: uuid!) {
                        groups(where: {created_by: {_eq: $userId}}, order_by: {created_at: desc}) {
                            id
                            name
                            photo_url
                            created_at
                        }
                    }
                `, { userId: window.authManager.currentUser.id });
                
                if (!error && groupsData.data.groups) {
                    return groupsData.data.groups;
                }
            } catch (error) {
                console.error('Error fetching groups from Nhost:', error);
            }
        }
        
        // Local fallback
        const localGroups = JSON.parse(localStorage.getItem('businessconnect_groups') || '[]');
        return localGroups.filter(g => g.created_by === window.authManager.currentUser.id);
    }

    // Get all channels for current user
    async getMyChannels() {
        await this.initialize();
        
        if (!window.authManager?.currentUser) return [];
        
        if (window.isNhostEnabled) {
            try {
                const { data: channelsData, error } = await window.nhost.graphql.request(`
                    query GetMyChannels($userId: uuid!) {
                        channels(where: {created_by: {_eq: $userId}}, order_by: {created_at: desc}) {
                            id
                            name
                            photo_url
                            created_at
                        }
                    }
                `, { userId: window.authManager.currentUser.id });
                
                if (!error && channelsData.data.channels) {
                    return channelsData.data.channels;
                }
            } catch (error) {
                console.error('Error fetching channels from Nhost:', error);
            }
        }
        
        // Local fallback
        const localChannels = JSON.parse(localStorage.getItem('businessconnect_channels') || '[]');
        return localChannels.filter(c => c.created_by === window.authManager.currentUser.id);
    }

    // Create a new group
    async createGroup(name, description = '', photoUrl = null) {
        await this.initialize();
        if (!window.authManager?.currentUser) throw new Error('User not authenticated');
        
        if (window.isSupabaseEnabled) {
            const { data, error } = await window.supabaseClient
                .from('groups')
                .insert({ name, description, photo_url: photoUrl, creator_id: window.authManager.currentUser.id, is_private: false })
                .select().single();
            if (error) throw error;
            await this.addUserToGroup(data.id, window.authManager.currentUser.id);
            return data;
        }
        
        // Local fallback
        const localGroups = JSON.parse(localStorage.getItem('businessconnect_groups') || '[]');
        const newGroup = {
            id: 'group_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name, description, photo_url: photoUrl,
            creator_id: window.authManager.currentUser.id,
            created_at: new Date().toISOString()
        };
        localGroups.push(newGroup);
        localStorage.setItem('businessconnect_groups', JSON.stringify(localGroups));
        await this.addUserToGroup(newGroup.id, window.authManager.currentUser.id);
        return newGroup;
    }

    // Create a new channel
    async createChannel(name, description = '', photoUrl = null) {
        await this.initialize();
        if (!window.authManager?.currentUser) throw new Error('User not authenticated');
        
        if (window.isSupabaseEnabled) {
            const { data, error } = await window.supabaseClient
                .from('channels')
                .insert({ name, description, photo_url: photoUrl, creator_id: window.authManager.currentUser.id, is_private: false })
                .select().single();
            if (error) throw error;
            await this.addUserToChannel(data.id, window.authManager.currentUser.id);
            return data;
        }
        
        // Local fallback
        const localChannels = JSON.parse(localStorage.getItem('businessconnect_channels') || '[]');
        const newChannel = {
            id: 'channel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name, description, photo_url: photoUrl,
            creator_id: window.authManager.currentUser.id,
            created_at: new Date().toISOString()
        };
        localChannels.push(newChannel);
        localStorage.setItem('businessconnect_channels', JSON.stringify(localChannels));
        await this.addUserToChannel(newChannel.id, window.authManager.currentUser.id);
        return newChannel;
    }

    // Add user to group
    async addUserToGroup(groupId, userId) {
        if (window.isSupabaseEnabled) {
            const { error } = await window.supabaseClient
                .from('group_members')
                .insert({ group_id: groupId, user_id: userId, role: 'member' });
            if (!error) return true;
            console.error('Error adding user to group:', error);
        }
        // Local fallback
        const localMembers = JSON.parse(localStorage.getItem(`group_members_${groupId}`) || '[]');
        if (!localMembers.includes(userId)) {
            localMembers.push(userId);
            localStorage.setItem(`group_members_${groupId}`, JSON.stringify(localMembers));
        }
        return true;
    }

    // Add user to channel
    async addUserToChannel(channelId, userId) {
        if (window.isSupabaseEnabled) {
            const { error } = await window.supabaseClient
                .from('channel_members')
                .insert({ channel_id: channelId, user_id: userId, role: 'subscriber' });
            if (!error) return true;
            console.error('Error adding user to channel:', error);
        }
        // Local fallback
        const localMembers = JSON.parse(localStorage.getItem(`channel_members_${channelId}`) || '[]');
        if (!localMembers.includes(userId)) {
            localMembers.push(userId);
            localStorage.setItem(`channel_members_${channelId}`, JSON.stringify(localMembers));
        }
        return true;
    }

    // Get group members
    async getGroupMembers(groupId) {
        if (window.isNhostEnabled) {
            try {
                const { data: membersData, error } = await window.nhost.graphql.request(`
                    query GetGroupMembers($groupId: uuid!) {
                        group_members(where: {group_id: {_eq: $groupId}}) {
                            users {
                                id
                                full_name
                                username
                                avatar_url
                                bio
                            }
                        }
                    }
                `, { groupId });
                
                if (!error && membersData.data.group_members) {
                    return membersData.data.group_members.map(member => member.users);
                }
            } catch (error) {
                console.error('Error fetching group members from Nhost:', error);
            }
        }
        
        // Local fallback
        const localMembers = JSON.parse(localStorage.getItem(`group_members_${groupId}`) || '[]');
        const allUsers = JSON.parse(localStorage.getItem('businessconnect_all_users') || '[]');
        return localMembers.map(memberId => 
            allUsers.find(user => user.id === memberId)
        ).filter(Boolean);
    }

    // Get channel members
    async getChannelMembers(channelId) {
        if (window.isNhostEnabled) {
            try {
                const { data: membersData, error } = await window.nhost.graphql.request(`
                    query GetChannelMembers($channelId: uuid!) {
                        channel_members(where: {channel_id: {_eq: $channelId}}) {
                            users {
                                id
                                full_name
                                username
                                avatar_url
                                bio
                            }
                        }
                    }
                `, { channelId });
                
                if (!error && membersData.data.channel_members) {
                    return membersData.data.channel_members.map(member => member.users);
                }
            } catch (error) {
                console.error('Error fetching channel members from Nhost:', error);
            }
        }
        
        // Local fallback
        const localMembers = JSON.parse(localStorage.getItem(`channel_members_${channelId}`) || '[]');
        const allUsers = JSON.parse(localStorage.getItem('businessconnect_all_users') || '[]');
        return localMembers.map(memberId => 
            allUsers.find(user => user.id === memberId)
        ).filter(Boolean);
    }
}

// Initialize the manager
window.groupsChannelsManager = new GroupsChannelsManager();

