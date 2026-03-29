// Startup manager — just monitors network, no re-init
class StartupManager {
    constructor() {
        this.isOnline = navigator.onLine;
        window.addEventListener('online',  () => { this.isOnline = true; });
        window.addEventListener('offline', () => { this.isOnline = false; });
    }
    initialize() { /* authManager already initialized in index.html DOMContentLoaded */ }
}
window.startupManager = new StartupManager();
