// COMPREHENSIVE SIGNUP FIX
(function() {

    // Safe signup with full session cleanup
    window.safeHandleRegister = async function(email, password, username, fullName) {
        try {

            if (window.nhost) {
                try { await window.nhost.auth.signOut(); } catch(e) {}
                try { await window.nhost.auth.signOut(); } catch(e) {}
            }
            if (window.supabaseClient) {
                try { await window.supabaseClient.auth.signOut(); } catch(e) {}
            }

            // Clear all storage
            try { localStorage.clear(); } catch(e) {}
            try { sessionStorage.clear(); } catch(e) {}
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (window.nhost && window.nhost.auth.getUser()) {
                throw new Error('Could not clear session. Please refresh the page and try again.');
            }

            const result = await window.nhost.auth.signUp({
                email: email,
                password: password,
                options: {
                    displayName: fullName,
                    metadata: { username: username.toLowerCase(), full_name: fullName }
                }
            });

            if (result.error) {
                console.error('❌ Signup failed:', result.error);
                const errCode = result.error.error || '';
                const errMsg = (result.error.message || '').toLowerCase();
                if (errCode === 'already-signed-in') {
                    try { await window.nhost.auth.signOut(); } catch(e) {}
                    try { localStorage.clear(); sessionStorage.clear(); } catch(e) {}
                    await new Promise(r => setTimeout(r, 800));
                    const retry = await window.nhost.auth.signUp({ email, password, options: { displayName: fullName, metadata: { username: username.toLowerCase(), full_name: fullName } } });
                    if (retry.error) throw new Error(retry.error.message || 'Registration failed. Please try again.');
                    result.session = retry.session;
                } else if (
                    errCode === 'email-already-in-use' ||
                    errCode === 'user-already-exists' ||
                    errMsg.includes('already') ||
                    errMsg.includes('exists') ||
                    errMsg.includes('registered') ||
                    result.error.status === 409
                ) {
                    throw new Error('This email is already registered. Please sign in or use a different email.');
                } else if (result.error.status === 500) {
                    throw new Error('This email may already be registered. Please try signing in instead.');
                } else {
                    throw new Error(result.error.message || 'Registration failed. Please try again.');
                }
            }


            // Handle no session (email verification required)
            if (!result.session || !result.session.user) {
                if (window.authManager) {
                    window.authManager.showNotification('Account created! Please check your email to verify your account.', 'success');
                    setTimeout(() => window.authManager.showLoginForm(), 2000);
                }
                return;
            }

            // Create profile in DB
            const uid = result.session.user.id;
            const uname = username.toLowerCase();
            await window.nhost.graphql.request(`
                mutation InsertProfile($obj: profiles_insert_input!) {
                    insert_profiles_one(object: $obj, on_conflict: {constraint: profiles_pkey, update_columns: [full_name, username]}) {
                        id username full_name email avatar_url bio is_active
                    }
                }
            `, { obj: { id: uid, username: uname, full_name: fullName, email, is_active: true, bio: null, avatar_url: null } });

            if (window.authManager) {
                window.authManager.currentUser = { id: uid, email, full_name: fullName, username: uname, avatar_url: null };
                localStorage.setItem('businessconnect_current_user', JSON.stringify(window.authManager.currentUser));
                window.authManager.showNotification('Account created successfully!', 'success');
                setTimeout(() => window.authManager.showApp(), 1000);
            }

        } catch (error) {
            console.error('🔥 Registration error:', error);
            if (window.authManager) {
                window.authManager.showNotification(error.message, 'error');
            } else {
                alert(error.message);
            }
        }
    };

    // Setup single safe handler on the form
    const setupHandler = () => {
        const form = document.getElementById('registerForm');
        if (!form) {
            setTimeout(setupHandler, 200);
            return;
        }


        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            const submitBtn = document.getElementById('registerBtnText');
            const spinner = document.getElementById('registerSpinner');

            if (submitBtn) submitBtn.style.display = 'none';
            if (spinner) spinner.style.display = 'block';

            try {
                const email = document.getElementById('registerEmail')?.value?.trim().toLowerCase();
                const password = document.getElementById('registerPassword')?.value;
                const username = document.getElementById('registerUsername')?.value?.trim();
                const fullName = document.getElementById('registerFullName')?.value?.trim();


                if (!email || !password || !username || !fullName) throw new Error('All fields are required');
                if (password.length < 9) throw new Error('Password must be at least 9 characters');
                if (username.length < 3) throw new Error('Username must be at least 3 characters');
                if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username can only contain letters, numbers, and underscores');

                await window.safeHandleRegister(email, password, username, fullName);

            } catch (error) {
                console.error('Form error:', error);
                if (window.authManager) {
                    window.authManager.showNotification(error.message, 'error');
                }
            } finally {
                if (submitBtn) submitBtn.style.display = 'block';
                if (spinner) spinner.style.display = 'none';
            }
        }, true); // useCapture=true to run before other handlers

    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHandler);
    } else {
        setupHandler();
    }

})();
