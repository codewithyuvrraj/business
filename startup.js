// BusinessConnect Startup Manager
// Ensures proper initialization order and handles offline scenarios

class StartupManager {
    constructor() {
        this.initAttempts = 0;
        this.maxAttempts = 5;
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
    }

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.retryInitialization();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    async initialize() {
        this.initAttempts++;

        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve, { once: true });
                });
            }

            // Wait a bit for external scripts to load
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if essential components are available
            const hasNhost = window.NhostClient && window.nhost;
            const hasSupabase = window.supabase && window.supabaseClient;

            if (!this.isOnline) {
            } else if (!hasNhost && !hasSupabase) {
                throw new Error('No backend services available');
            }

            // Initialize auth manager
            if (window.authManager) {
                await window.authManager.initializeAuth();
                return true;
            } else {
                throw new Error('AuthManager not available');
            }

        } catch (error) {
            console.error(`❌ Startup attempt ${this.initAttempts} failed:`, error);

            if (this.initAttempts < this.maxAttempts) {
                const delay = Math.min(2000 * this.initAttempts, 10000);
                setTimeout(() => this.initialize(), delay);
                return false;
            } else {
                console.error('❌ All startup attempts failed - showing offline mode');
                this.showOfflineMode();
                return false;
            }
        }
    }

    retryInitialization() {
        if (this.initAttempts >= this.maxAttempts) {
            this.initAttempts = 0; // Reset attempts when network comes back
            this.initialize();
        }
    }

    showOfflineMode() {
        // Show a basic offline interface
        const authContainer = document.getElementById('auth-container');
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="auth-card">
                    <div class="auth-header">
                        <h1>
                            <img src="logo.png" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 16px; vertical-align: middle; object-fit: cover;" alt="Logo">
                            BusinessConnect
                        </h1>
                        <p>Professional Social Platform</p>
                    </div>
                    <div class="auth-form">
                        <h2>⚠️ Connection Issue</h2>
                        <p style="text-align: center; color: #6b7280; margin-bottom: 20px;">
                            Unable to connect to our servers. Please check your internet connection and try again.
                        </p>
                        <button onclick="window.location.reload()" class="btn btn-primary">
                            🔄 Retry Connection
                        </button>
                        <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
                            <strong>Troubleshooting:</strong><br>
                            • Check your internet connection<br>
                            • Disable ad blockers or VPN<br>
                            • Try refreshing the page<br>
                            • Clear browser cache if issues persist
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize startup manager when script loads
window.startupManager = new StartupManager();

// Start initialization when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.startupManager.initialize();
    });
} else {
    window.startupManager.initialize();
}