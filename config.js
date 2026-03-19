// ============================================================
// BUSINESSCONNECT - DUAL BACKEND CONFIGURATION
// Nhost  → Auth, Users, Followers, Groups, Channels, Storage
// Supabase → All Messages (direct + group + channel) realtime
// ============================================================

const NHOST_SUBDOMAIN  = 'rfgzsblvrlekjkerhjrr';
const NHOST_REGION     = 'eu-central-1';
const SUPABASE_URL     = 'https://mbvdirbpobgcclkmqvvg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VvB5XRRQ7DPGcLo6pEghSA_mf3jBYXi';

function initBackends() {
    // ---- NHOST ----
    try {
        if (!window.NhostClient) {
            console.warn('⚠️ Nhost SDK not available - using offline mode');
            window.isNhostEnabled = false;
        } else {
            window.nhost = new window.NhostClient({
                subdomain: NHOST_SUBDOMAIN,
                region: NHOST_REGION,
                autoSignIn: true,
                autoRefreshToken: true
            });
            window.isNhostEnabled = true;
            console.log('✅ Nhost initialized');

            // Signal auth app once Nhost resolves session on page load
            window.nhost.auth.onAuthStateChanged(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                window._nhostSessionReady = true;
                window._nhostSessionUser = session?.user || null;
                window.dispatchEvent(new Event('nhost-session-ready'));
            } else if (event === 'SIGNED_OUT') {
                window._nhostSessionReady = true;
                window._nhostSessionUser = null;
                window.dispatchEvent(new Event('nhost-session-ready'));
            }
            if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
                try {
                    const u = session.user;
                    const username = u.displayName || u.email.split('@')[0];
                    await window.nhost.graphql.request(`
                        mutation UpsertProfile($id: uuid!, $email: String!, $username: String!, $full_name: String, $avatar_url: String) {
                            insert_profiles_one(object: {
                                id: $id, email: $email, username: $username,
                                full_name: $full_name, avatar_url: $avatar_url
                            },
                            on_conflict: { constraint: profiles_pkey, update_columns: [last_seen, updated_at] }) {
                                id
                            }
                        }`,
                        { id: u.id, email: u.email, username, full_name: u.displayName || null, avatar_url: u.avatarUrl || null }
                    );
                } catch(profileError) {
                    console.warn('Profile upsert failed:', profileError);
                }
            }
            });
        }
    } catch (e) {
        console.error('❌ Nhost init failed:', e);
        window.isNhostEnabled = false;
    }

    // ---- SUPABASE ----
    try {
        if (!window.supabase) {
            console.warn('⚠️ Supabase SDK not loaded - messaging features disabled');
            window.isSupabaseEnabled = false;
            return;
        }
        
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.isSupabaseEnabled = true;
        console.log('✅ Supabase initialized');
    } catch (e) {
        console.error('❌ Supabase init failed:', e);
        window.isSupabaseEnabled = false;
        
        // Retry once after 3s in case CDN was slow
        setTimeout(() => {
            if (window.supabase && !window.supabaseClient) {
                try {
                    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                    window.isSupabaseEnabled = true;
                    console.log('✅ Supabase initialized (retry)');
                } catch(e2) { 
                    console.error('❌ Supabase retry failed:', e2);
                    window.isSupabaseEnabled = false;
                }
            }
        }, 3000);
    }
}

// Wait for DOM and SDKs to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initBackends, 100);
    });
} else {
    setTimeout(initBackends, 100);
}

// Also listen for the nhost-sdk-ready event as fallback
if (window.NhostClient) {
    // Already loaded
} else {
    window.addEventListener('nhost-sdk-ready', initBackends, { once: true });
}
