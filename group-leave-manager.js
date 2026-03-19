// Group Leave Manager
class GroupLeaveManager {

    async _nhostReq(query, variables) {
        const token = await window.authManager._getAuthToken();
        const res = await fetch('https://rfgzsblvrlekjkerhjrr.hasura.eu-central-1.nhost.run/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        return json.data;
    }

    async leaveGroup(groupId, userId) {
        try {
            await this._nhostReq(`
                mutation LeaveGroup($groupId: uuid!, $userId: uuid!) {
                    delete_group_members(where: {group_id: {_eq: $groupId}, user_id: {_eq: $userId}}) {
                        affected_rows
                    }
                }
            `, { groupId, userId });
            return { success: true, message: 'Left group successfully' };
        } catch (e) {
            console.error('Error leaving group:', e);
            return { success: false, error: e.message };
        }
    }

    async leaveChannel(channelId, userId) {
        try {
            await this._nhostReq(`
                mutation LeaveChannel($channelId: uuid!, $userId: uuid!) {
                    delete_channel_members(where: {channel_id: {_eq: $channelId}, user_id: {_eq: $userId}}) {
                        affected_rows
                    }
                }
            `, { channelId, userId });
            return { success: true, message: 'Left channel successfully' };
        } catch (e) {
            console.error('Error leaving channel:', e);
            return { success: false, error: e.message };
        }
    }

    async showLeaveGroupsModal() {
        try {
            const userId = window.authManager.currentUser?.id;
            if (!userId) { window.authManager.showNotification('Not logged in', 'error'); return; }

            const data = await this._nhostReq(`
                query GetJoinedGroups($userId: uuid!) {
                    group_members(where: {user_id: {_eq: $userId}}) {
                        group_id
                        group { id name description created_by }
                    }
                }
            `, { userId });

            const groups = (data?.group_members || [])
                .map(m => m.group)
                .filter(g => g && g.created_by !== userId);

            this.displayLeaveModal(groups, 'groups');
        } catch (e) {
            console.error('Error loading groups to leave:', e);
            window.authManager.showNotification('Failed to load groups', 'error');
        }
    }

    displayLeaveModal(items, type) {
        const label = type === 'groups' ? 'Groups' : 'Channels';
        const modal = document.createElement('div');
        modal.className = 'overlay';
        modal.innerHTML = `
            <div class="settings-modal" style="max-width:480px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;">
                <div class="settings-header" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;flex-shrink:0;">
                    <h3 style="display:flex;align-items:center;gap:8px;">
                        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Leave ${label}
                    </h3>
                    <button class="close-btn" onclick="this.closest('.overlay').remove()" style="color:white;">
                        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <div style="overflow-y:auto;flex:1;padding:16px;">
                    ${items.length === 0 ? `
                        <div style="text-align:center;padding:40px 20px;color:#6b7280;">
                            <svg viewBox="0 0 24 24" style="width:48px;height:48px;fill:none;stroke:#d1d5db;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;margin-bottom:12px;"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6"/><circle cx="17" cy="7" r="3"/><path d="M11 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
                            <h3 style="margin-bottom:8px;">No ${label} to Leave</h3>
                            <p>You can only leave ${label.toLowerCase()} you didn't create.</p>
                        </div>
                    ` : items.map(item => `
                        <div style="display:flex;align-items:center;padding:14px;background:#fef2f2;border-radius:12px;margin-bottom:10px;border-left:4px solid #ef4444;gap:12px;">
                            <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;flex-shrink:0;">
                                ${item.name.charAt(0).toUpperCase()}
                            </div>
                            <div style="flex:1;min-width:0;">
                                <div style="font-weight:600;color:#1f2937;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
                                <div style="color:#6b7280;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.description || 'No description'}</div>
                            </div>
                            <button onclick="window.groupLeaveManager.confirmLeave('${item.id}','${item.name}','${type}')" style="background:#ef4444;color:white;border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;flex-shrink:0;">
                                <svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                Leave
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    confirmLeave(itemId, itemName, type) {
        const modal = document.createElement('div');
        modal.className = 'overlay';
        modal.innerHTML = `
            <div class="settings-modal" style="max-width:380px;">
                <div class="settings-header" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;">
                    <h3 style="display:flex;align-items:center;gap:8px;">
                        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Confirm Leave
                    </h3>
                </div>
                <div style="padding:24px;text-align:center;">
                    <p style="margin-bottom:12px;color:#374151;font-size:15px;">Leave <strong>${itemName}</strong>?</p>
                    <p style="margin-bottom:24px;font-size:13px;color:#6b7280;">You will lose access to all messages in this ${type === 'groups' ? 'group' : 'channel'}.</p>
                    <div style="display:flex;gap:10px;">
                        <button onclick="window.groupLeaveManager.executeLeave('${itemId}','${type}')" style="background:#ef4444;color:white;border:none;padding:12px 0;border-radius:8px;cursor:pointer;font-weight:600;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;">
                            <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            Leave
                        </button>
                        <button onclick="this.closest('.overlay').remove()" style="background:#f3f4f6;color:#374151;border:none;padding:12px 0;border-radius:8px;cursor:pointer;font-weight:600;flex:1;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async executeLeave(itemId, type) {
        document.querySelectorAll('.overlay').forEach(o => o.remove());
        const userId = window.authManager.currentUser?.id;
        const result = type === 'groups'
            ? await this.leaveGroup(itemId, userId)
            : await this.leaveChannel(itemId, userId);

        if (result.success) {
            window.authManager.showNotification(result.message, 'success');
            setTimeout(() => this.showLeaveGroupsModal(), 400);
        } else {
            window.authManager.showNotification(result.error || 'Failed to leave', 'error');
        }
    }
}

window.groupLeaveManager = new GroupLeaveManager();
