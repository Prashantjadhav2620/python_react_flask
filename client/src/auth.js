

import { createAuthProvider } from 'react-token-auth';

// type Session = { accessToken: string; refreshToken: string };

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: session => session.access_token,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('/auth/refersh', {
            method: 'POST',
            body: token.refresh_token,
        }).then(r => r.json()),
});
