// Lock Manager — localStorage-first, DB sync when columns are available
class LockManager {
    constructor() {
        this.pendingUserId   = null;
        this._pendingGroup   = null;
        this._pendingChannel = null;
        this._dbAvailable    = null;
        // Load only persistent lock state from localStorage — strip any session flags
        const saved = JSON.parse(localStorage.getItem('bc_lock_state') || '{}');
        this._cache = {};
        for (const k of Object.keys(saved)) {
            if (!k.endsWith('_unlocked_session')) this._cache[k] = saved[k];
        }
        // Session unlock flags live in memory only — never persisted
        this._sessionFlags = {};
    }

    get lockPassword() { return this._cache.lock_password || null; }

    // ── SVG helpers ───────────────────────────────────────────────────────────
    _svgLock(c='white')    { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`; }
    _svgUnlock(c='white')  { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`; }
    _svgMsg(c='white')     { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`; }
    _svgPeople(c='white')  { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6"/><circle cx="17" cy="7" r="3"/><path d="M11 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`; }
    _svgChannel(c='white') { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>`; }
    _svgKey(c='white')     { return `<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`; }
    _svgX()                { return `<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`; }

    // ── DB helpers ────────────────────────────────────────────────────────────
    async _nhostReq(query, variables) {
        const token = await window.authManager._getAuthToken();
        const res = await fetch('https://rfgzsblvrlekjkerhjrr.hasura.eu-central-1.nhost.run/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        return json.data;
    }

    async _loadFromDB() {
        const uid = window.authManager?.currentUser?.id;
        if (!uid) return;

        // If we already know DB columns are missing, skip and use localStorage
        if (this._dbAvailable === false) return;

        try {
            const data = await this._nhostReq(`
                query GetLockState($id: uuid!) {
                    profiles_by_pk(id: $id) {
                        messages_locked groups_locked channels_locked lock_password
                    }
                }
            `, { id: uid });
            const p = data?.profiles_by_pk;
            if (p) {
                // Preserve session-unlock flags, only overwrite DB fields
                this._cache.messages_locked  = p.messages_locked  || false;
                this._cache.groups_locked    = p.groups_locked    || false;
                this._cache.channels_locked  = p.channels_locked  || false;
                this._cache.lock_password    = p.lock_password    || null;
                localStorage.setItem('bc_lock_state', JSON.stringify(this._cache));
            }
            this._dbAvailable = true;
        } catch(e) {
            const msg = e.message || '';
            if (msg.includes('not found in type') || msg.includes('field') || msg.includes('column')) {
                this._dbAvailable = false;
            } else {
                this._dbAvailable = false;
            }
        }
    }

    async _saveToDB(fields) {
        const uid = window.authManager?.currentUser?.id;
        Object.assign(this._cache, fields);
        // Never persist session flags to localStorage
        const persistent = {};
        for (const k of Object.keys(this._cache)) {
            if (!k.endsWith('_unlocked_session')) persistent[k] = this._cache[k];
        }
        localStorage.setItem('bc_lock_state', JSON.stringify(persistent));

        if (!uid || this._dbAvailable === false) return;

        try {
            const setClauses = Object.keys(fields).map(k => `${k}: $${k}`).join(', ');
            const varDefs    = Object.keys(fields).map(k =>
                `$${k}: ${typeof fields[k] === 'boolean' ? 'Boolean' : 'String'}`
            ).join(', ');
            await this._nhostReq(`
                mutation UpdateLockState($id: uuid!, ${varDefs}) {
                    update_profiles_by_pk(pk_columns: {id: $id}, _set: {${setClauses}}) { id }
                }
            `, { id: uid, ...fields });
            this._dbAvailable = true;
        } catch(e) {
            const msg = e.message || '';
            if (msg.includes('not found in type') || msg.includes('field') || msg.includes('column')) {
                this._dbAvailable = false;
                console.warn('LockManager: DB columns not tracked, saved to localStorage only');
            } else {
                console.warn('LockManager: DB save failed, saved to localStorage only', msg);
            }
        }
    }

    // ── Core gate — checks localStorage first, syncs DB if available ──────────
    async checkAndGate(feature, onAllowed) {
        // Prevent duplicate modals
        if (document.getElementById('lockUnlockOverlay')) return false;

        await this._loadFromDB();

        const locked          = !!this._cache[feature + '_locked'];
        const sessionUnlocked = !!this._sessionFlags[feature];

        if (!locked || sessionUnlocked) return true;

        this.showUnlockModal(feature, onAllowed);
        return false;
    }

    // ── Public API ────────────────────────────────────────────────────────────
    isFeatureLocked(feature)    { return !!this._cache[feature + '_locked']; }
    isFeatureUnlocked(feature)  { return !!this._sessionFlags[feature]; }
    setFeatureUnlocked(feature) { this._sessionFlags[feature] = true; }
    clearUnlockStatus(feature)  { delete this._sessionFlags[feature]; }

    // ── Modals ────────────────────────────────────────────────────────────────
    showLockOptions() {
        const m = document.createElement('div');
        m.className = 'overlay';
        m.innerHTML = `
            <div class="settings-modal" style="max-width:300px;">
                <div class="settings-header" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;">
                    <h3 style="display:flex;align-items:center;gap:8px;">${this._svgLock()} Lock Options</h3>
                    <button class="close-btn" onclick="this.closest('.overlay').remove()" style="color:white;">${this._svgX()}</button>
                </div>
                <div style="padding:16px;display:flex;flex-direction:column;gap:8px;">
                    <button onclick="window.lockManager.lockFeature('messages')" style="padding:12px;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgMsg()} Lock Messages</button>
                    <button onclick="window.lockManager.lockFeature('groups')"   style="padding:12px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgPeople()} Lock Groups</button>
                    <button onclick="window.lockManager.lockFeature('channels')" style="padding:12px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgChannel()} Lock Channels</button>
                </div>
            </div>`;
        document.body.appendChild(m);
    }

    showUnlockOptions() {
        const m = document.createElement('div');
        m.className = 'overlay';
        m.innerHTML = `
            <div class="settings-modal" style="max-width:300px;">
                <div class="settings-header" style="background:linear-gradient(135deg,#10b981,#059669);color:white;">
                    <h3 style="display:flex;align-items:center;gap:8px;">${this._svgUnlock()} Unlock Options</h3>
                    <button class="close-btn" onclick="this.closest('.overlay').remove()" style="color:white;">${this._svgX()}</button>
                </div>
                <div style="padding:16px;display:flex;flex-direction:column;gap:8px;">
                    <button onclick="window.lockManager.unlockFeature('messages')" style="padding:12px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgMsg()} Unlock Messages</button>
                    <button onclick="window.lockManager.unlockFeature('groups')"   style="padding:12px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgPeople()} Unlock Groups</button>
                    <button onclick="window.lockManager.unlockFeature('channels')" style="padding:12px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:600;">${this._svgChannel()} Unlock Channels</button>
                </div>
            </div>`;
        document.body.appendChild(m);
    }

    // ── Lock from inside the page (lock icon in header) ────────────────────
    async lockPageFeature(feature) {
        if (!this.lockPassword) {
            this.showSetPasswordModal(feature);
            return;
        }
        // Lock it and immediately clear session unlock so next visit needs password
        await this._saveToDB({ [feature + '_locked']: true });
        this.clearUnlockStatus(feature);
        window.authManager.showNotification(`${this._cap(feature)} locked`, 'success');
        // Go back to home feed
        setTimeout(() => window.authManager.loadHomeFeed(), 600);
    }

    // ── Lock / Unlock flow ────────────────────────────────────────────────────
    async lockFeature(feature) {
        if (!this.lockPassword) { this.showSetPasswordModal(feature); return; }
        document.querySelectorAll('.overlay').forEach(o => o.remove());
        await this._saveToDB({ [feature + '_locked']: true });
        this.clearUnlockStatus(feature);
        window.authManager.showNotification(`${this._cap(feature)} locked`, 'success');
    }

    async unlockFeature(feature) {
        await this._loadFromDB();
        if (!this._cache[feature + '_locked']) {
            window.authManager.showNotification(`${this._cap(feature)} is not locked`, 'error');
            return;
        }
        this.showUnlockModal(feature, null);
    }

    // Legacy aliases
    async lockMessages()   { this.lockFeature('messages'); }
    async lockGroups()     { this.lockFeature('groups'); }
    async lockChannels()   { this.lockFeature('channels'); }
    async unlockMessages() { this.unlockFeature('messages'); }
    async unlockGroups()   { this.unlockFeature('groups'); }
    async unlockChannels() { this.unlockFeature('channels'); }

    showSetPasswordModal(feature) {
        const m = document.createElement('div');
        m.className = 'overlay';
        m.innerHTML = `
            <div class="settings-modal" style="max-width:350px;">
                <div class="settings-header" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;">
                    <h3 style="display:flex;align-items:center;gap:8px;">${this._svgKey()} Set Lock Password</h3>
                </div>
                <div style="padding:20px;text-align:center;">
                    <p style="margin-bottom:16px;color:#374151;">Set a password to lock <strong>${this._cap(feature)}</strong></p>
                    <form onsubmit="event.preventDefault();window.lockManager.confirmSetPassword('${feature}');">
                        <input type="password" id="lockPwdInput" autocomplete="new-password" placeholder="Enter password (min 4 chars)" style="width:100%;padding:10px;margin-bottom:10px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;outline:none;">
                        <input type="password" id="lockPwdConfirm" autocomplete="new-password" placeholder="Confirm password" style="width:100%;padding:10px;margin-bottom:16px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;outline:none;">
                        <div style="display:flex;gap:8px;">
                            <button type="button" onclick="this.closest('.overlay').remove()" style="flex:1;padding:10px;background:#f3f4f6;color:#374151;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Cancel</button>
                            <button type="submit" style="flex:1;padding:10px;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">${this._svgLock()} Set & Lock</button>
                        </div>
                    </form>
                </div>
            </div>`;
        document.body.appendChild(m);
        setTimeout(() => document.getElementById('lockPwdInput')?.focus(), 100);
    }

    showUnlockModal(feature, onAllowed) {
        document.getElementById('lockUnlockOverlay')?.remove();
        const m = document.createElement('div');
        m.className = 'overlay';
        m.id = 'lockUnlockOverlay';
        m.innerHTML = `
            <div class="settings-modal" style="max-width:350px;">
                <div class="settings-header" style="background:linear-gradient(135deg,#10b981,#059669);color:white;">
                    <h3 style="display:flex;align-items:center;gap:8px;">${this._svgUnlock()} ${this._cap(feature)} is Locked</h3>
                </div>
                <div style="padding:20px;text-align:center;">
                    <div style="margin-bottom:16px;">${this._svgLock('#f59e0b').replace('15px','40px').replace('15px','40px')}</div>
                    <p style="margin-bottom:16px;color:#374151;font-weight:500;">Enter your password to access <strong>${this._cap(feature)}</strong></p>
                    <form onsubmit="event.preventDefault();window.lockManager._submitUnlock('${feature}');">
                        <input type="password" id="unlockPwdInput" autocomplete="current-password" placeholder="Enter lock password" style="width:100%;padding:10px;margin-bottom:16px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px;box-sizing:border-box;outline:none;">
                        <div style="display:flex;gap:8px;">
                            <button type="button" onclick="this.closest('.overlay').remove();window.lockManager._clearPending();" style="flex:1;padding:10px;background:#f3f4f6;color:#374151;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Cancel</button>
                            <button type="submit" style="flex:1;padding:10px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">${this._svgUnlock()} Unlock</button>
                        </div>
                    </form>
                </div>
            </div>`;
        document.body.appendChild(m);
        this._unlockCallback = onAllowed;
        setTimeout(() => document.getElementById('unlockPwdInput')?.focus(), 100);
    }

    async _submitUnlock(feature) {
        const pwd = document.getElementById('unlockPwdInput')?.value;
        if (!pwd || pwd !== this.lockPassword) {
            window.authManager.showNotification('Incorrect password', 'error');
            document.getElementById('unlockPwdInput').value = '';
            document.getElementById('unlockPwdInput').focus();
            return;
        }
        document.getElementById('lockUnlockOverlay')?.remove();
        this.setFeatureUnlocked(feature);
        window.authManager.showNotification(`${this._cap(feature)} unlocked for this session`, 'success');
        if (typeof this._unlockCallback === 'function') {
            const cb = this._unlockCallback;
            this._unlockCallback = null;
            setTimeout(cb, 100);
        }
    }

    async confirmSetPassword(feature) {
        const pwd  = document.getElementById('lockPwdInput')?.value;
        const conf = document.getElementById('lockPwdConfirm')?.value;
        if (!pwd || pwd.length < 4) {
            window.authManager.showNotification('Password must be at least 4 characters', 'error'); return;
        }
        if (pwd !== conf) {
            window.authManager.showNotification('Passwords do not match', 'error'); return;
        }
        document.querySelectorAll('.overlay').forEach(o => o.remove());
        await this._saveToDB({ lock_password: pwd, [feature + '_locked']: true });
        this.clearUnlockStatus(feature);
        window.authManager.showNotification(`Password set — ${this._cap(feature)} locked`, 'success');
    }

    async confirmUnlock(feature) {
        await this._submitUnlock(feature);
        await this._saveToDB({ [feature + '_locked']: false });
    }

    _clearPending() {
        this.pendingUserId   = null;
        this._pendingGroup   = null;
        this._pendingChannel = null;
        this._unlockCallback = null;
    }

    _cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
}

window.lockManager = new LockManager();
