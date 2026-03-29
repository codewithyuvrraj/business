// Message Request Functions for Supabase Integration
// Add these functions to the AuthManager class

async showMessageRequests() {
    try {
        if (!window.supabaseClient || !this.currentUser) {
            this.showNotification('Please login to view message requests', 'error');
            return;
        }
        
        const { data: requests, error } = await window.supabaseClient
            .from('message_requests')
            .select('id, sender_id, created_at, message')
            .eq('receiver_id', this.currentUser.id)
            .eq('status', 'pending')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error loading message requests:', error);
            this.showNotification('Failed to load message requests', 'error');
            return;
        }
        
        if (!requests || requests.length === 0) {
            this.showNotification('No pending message requests', 'success');
            return;
        }
        
        const senderIds = requests.map(r => r.sender_id);
        let senderProfiles = {};
        
        if (window.isNhostEnabled && senderIds.length > 0) {
            try {
                const { data: profilesData } = await this._nhostRequest(`
                    query GetSenderProfiles($ids: [uuid!]!) {
                        profiles(where: {id: {_in: $ids}}) {
                            id full_name username avatar_url profile_picture_url
                        }
                    }
                `, { ids: senderIds });
                
                if (profilesData?.profiles) {
                    profilesData.profiles.forEach(profile => {
                        senderProfiles[profile.id] = profile;
                    });
                }
            } catch (error) {
                console.error('Error loading sender profiles:', error);
            }
        }
        
        const modalHtml = `
            <div class="overlay" id="messageRequestsOverlay">
                <div class="settings-modal" style="max-width: 500px;">
                    <div class="settings-header" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white;">
                        <h3><i class="fas fa-envelope"></i> Message Requests (${requests.length})</h3>
                        <button class="close-btn" onclick="document.getElementById('messageRequestsOverlay').remove()" style="color: white;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="settings-content" style="max-height: 60vh; overflow-y: auto; padding: 0;">
                        ${requests.map(request => {
                            const sender = senderProfiles[request.sender_id] || { full_name: 'Unknown User', username: 'unknown' };
                            const displayName = sender.full_name || sender.username || 'Unknown User';
                            const avatarUrl = sender.profile_picture_url || sender.avatar_url;
                            
                            return `
                                <div style="padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0;">
                                        ${avatarUrl ? 
                                            `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover;">` :
                                            `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #3b82f6, #1e40af); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px;">${displayName.charAt(0).toUpperCase()}</div>`
                                        }
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${displayName}</div>
                                        <div style="font-size: 12px; color: #6b7280;">Wants to send you a message</div>
                                        ${request.message ? `<div style="font-size: 12px; color: #4b5563; margin-top: 4px; font-style: italic;">"${request.message}"</div>` : ''}
                                        <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">${new Date(request.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <div style="display: flex; gap: 8px;">
                                        <button onclick="window.authManager.approveMessageRequest('${request.id}', '${request.sender_id}')" style="background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">
                                            <i class="fas fa-check"></i> Accept
                                        </button>
                                        <button onclick="window.authManager.rejectMessageRequest('${request.id}')" style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">
                                            <i class="fas fa-times"></i> Decline
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
    } catch (error) {
        console.error('Error loading message requests:', error);
        this.showNotification('Failed to load message requests', 'error');
    }
}

async approveMessageRequest(requestId, senderId) {
    try {
        const { error } = await window.supabaseClient
            .from('message_requests')
            .update({ status: 'approved' })
            .eq('id', requestId);
        
        if (error) {
            console.error('Error approving message request:', error);
            this.showNotification('Failed to approve request', 'error');
            return;
        }
        
        this.showNotification('Message request approved!', 'success');
        document.getElementById('messageRequestsOverlay').remove();
        window.chatManager.startConversation(senderId);
        
    } catch (error) {
        console.error('Error approving message request:', error);
        this.showNotification('Failed to approve request', 'error');
    }
}

async rejectMessageRequest(requestId) {
    try {
        const { error } = await window.supabaseClient
            .from('message_requests')
            .update({ status: 'rejected' })
            .eq('id', requestId);
        
        if (error) {
            console.error('Error rejecting message request:', error);
            this.showNotification('Failed to reject request', 'error');
            return;
        }
        
        this.showNotification('Message request declined', 'success');
        document.getElementById('messageRequestsOverlay').remove();
        setTimeout(() => this.showMessageRequests(), 500);
        
    } catch (error) {
        console.error('Error rejecting message request:', error);
        this.showNotification('Failed to reject request', 'error');
    }
}