// Authentication Conflict Resolver
// Handles persistent "already-signed-in" errors during registration

class AuthConflictResolver {
    constructor() {
        this.conflictAttempts = 0;
        this.maxConflictAttempts = 3;
        this.isResolving = false;
    }

    async resolveAuthConflict() {
        if (this.isResolving) return false;
        
        this.isResolving = true;
        this.conflictAttempts++;
        
        
        try {
            // Nuclear option: Clear everything
            await this.clearAllAuthData();
            
            // Wait for cleanup
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Force page refresh if max attempts reached
            if (this.conflictAttempts >= this.maxConflictAttempts) {
                this.showRefreshNotification();
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
                return true;
            }
            
            return false;
        } finally {
            this.isResolving = false;
        }
    }
    
    async clearAllAuthData() {
        
        // Clear Nhost session multiple ways
        if (window.nhost) {
            try {
                await window.nhost.auth.signOut();
                await window.nhost.auth.signOut(); // Double attempt
            } catch (e) {
                console.log('Nhost signOut error:', e);
            }
        }
        
        // Clear all possible storage locations
        try {
            // LocalStorage
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('nhost') || key.includes('auth') || key.includes('session'))) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            // SessionStorage
            sessionStorage.clear();
            
            // IndexedDB cleanup
            if ('indexedDB' in window) {
                try {
                    const databases = await indexedDB.databases();
                    for (const db of databases) {
                        if (db.name && db.name.includes('nhost')) {
                            indexedDB.deleteDatabase(db.name);
                        }
                    }
                } catch (e) {
                    console.log('IndexedDB cleanup error:', e);
                }
            }
            
            // Clear cookies
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    }
    
    showRefreshNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10001;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 400px;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">
                🔄 Authentication Conflict Detected
            </div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">
                Refreshing page to resolve authentication issues...
            </div>
            <div style="font-size: 12px; opacity: 0.7;">
                This will only take a moment
            </div>
        `;
        
        document.body.appendChild(notification);
    }
    
    reset() {
        this.conflictAttempts = 0;
        this.isResolving = false;
    }
}

// Global instance
window.authConflictResolver = new AuthConflictResolver();

