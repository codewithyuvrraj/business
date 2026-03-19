// Quick fix for registration and login issues
// Add this script after your existing scripts

(function() {
    
    // Fix 1: Better error handling for registration with auto-refresh
    let registrationAttempts = 0;
    const maxRegistrationAttempts = 2;
    
    const originalHandleRegister = window.authManager?.handleRegister;
    if (originalHandleRegister && window.authManager) {
        window.authManager.handleRegister = async function(e) {
            e.preventDefault();
            this.setLoading('register', true);
            
            registrationAttempts++;
            
            try {
                // Force sign out before registration
                if (window.nhost?.auth?.getUser()) {
                    await window.nhost.auth.signOut();
                    await new Promise(r => setTimeout(r, 2000)); // Wait longer
                    
                    // Clear all session data
                    try {
                        localStorage.removeItem('nhostSession');
                        sessionStorage.clear();
                    } catch(e) {}
                }
                
                // Call original method
                return await originalHandleRegister.call(this, e);
            } catch (error) {
                console.error('Registration error:', error);
                
                // If we've hit max attempts and it's an auth conflict, force refresh
                if (registrationAttempts >= maxRegistrationAttempts && 
                    (error.message?.includes('already-signed-in') || error.message?.includes('Authentication conflict'))) {
                    
                    
                    // Show notification
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #3b82f6, #1e40af);
                        color: white;
                        padding: 20px 30px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                        z-index: 10001;
                        text-align: center;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    `;
                    
                    notification.innerHTML = `
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                            🔄 Auto-Fixing Registration Issue
                        </div>
                        <div style="font-size: 14px; opacity: 0.9;">
                            Refreshing page to resolve authentication conflict...
                        </div>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    // Clear everything and refresh
                    try {
                        localStorage.clear();
                        sessionStorage.clear();
                        document.cookie.split(";").forEach(function(c) { 
                            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                        });
                    } catch(e) {}
                    
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2000);
                    
                    return;
                }
                
                let errorMessage = 'Registration failed';
                if (error.message?.includes('already-signed-in')) {
                    errorMessage = `Authentication conflict (attempt ${registrationAttempts}/${maxRegistrationAttempts}). ${registrationAttempts >= maxRegistrationAttempts ? 'Refreshing page...' : 'Please try again.'}`;
                } else if (error.message?.includes('internal-server-error')) {
                    errorMessage = 'Server temporarily unavailable. Please try again in a few minutes.';
                } else if (error.message?.includes('email')) {
                    errorMessage = 'This email is already registered. Please use a different email.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                this.showNotification(errorMessage, 'error');
            } finally {
                this.setLoading('register', false);
            }
        };
    }
    
    // Fix 2: Add page refresh option for stuck states
    window.forceRefresh = function() {
        
        // Clear all auth data first
        try {
            localStorage.clear();
            sessionStorage.clear();
            
            // Clear cookies
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
        } catch(e) {
            console.log('Cleanup error:', e);
        }
        
        // Force hard refresh
        window.location.reload(true);
    };
    
    // Fix 3: Add emergency reset
    window.emergencyReset = function() {
        
        // Nuclear option - clear everything and refresh
        try {
            // Clear all storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Clear IndexedDB
            if ('indexedDB' in window) {
                indexedDB.databases().then(databases => {
                    databases.forEach(db => {
                        if (db.name) {
                            indexedDB.deleteDatabase(db.name);
                        }
                    });
                }).catch(e => console.log('IndexedDB cleanup error:', e));
            }
            
            // Clear cookies
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            
            // Clear service workers
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => {
                        registration.unregister();
                    });
                });
            }
            
        } catch(e) {
            console.log('Emergency reset error:', e);
        }
        
        // Show notification and refresh
        alert('Emergency reset complete. Page will refresh now.');
        window.location.href = window.location.href.split('?')[0]; // Remove query params
    };
    
    // Fix 4: Auth conflict resolver
    window.fixAuthConflict = function() {
        
        if (window.authConflictResolver) {
            window.authConflictResolver.resolveAuthConflict();
        } else {
            // Fallback
            window.forceRefresh();
        }
    };
    
    // Fix 5: Manual session cleanup
    window.clearAllSessions = function() {
        
        // Clear Nhost
        if (window.nhost) {
            window.nhost.auth.signOut().catch(() => {});
        }
        
        // Clear Supabase
        if (window.supabaseClient) {
            window.supabaseClient.auth.signOut().catch(() => {});
        }
        
        // Nuclear storage cleanup
        const storageKeys = [
            'nhostRefreshToken',
            'nhost-session',
            'nhostSession',
            'sb-auth-token',
            'supabase.auth.token',
            'businessconnect_current_user',
            'bc_email',
            'bc_pass'
        ];
        
        storageKeys.forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
        
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        
        alert('All sessions cleared! You can now try registration again.');
    };
    
    // Fix 6: Reset registration attempts counter
    window.resetRegistrationAttempts = function() {
        registrationAttempts = 0;
    };
    
    // Reset counter on successful page load
    window.addEventListener('load', () => {
        registrationAttempts = 0;
    });
    
    
    // Auto-fix for registration issues
    window.addEventListener('error', (e) => {
        if (e.message && e.message.includes('already-signed-in')) {
            setTimeout(() => {
                if (window.authConflictResolver) {
                    window.authConflictResolver.resolveAuthConflict();
                }
            }, 1000);
        }
    });
})();