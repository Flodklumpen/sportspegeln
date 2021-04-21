import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {

    if (!navigator.userAgent.includes('jsdom')) {
        const { isAuthenticated } = useAuth0();

        console.log(isAuthenticated);

        return (
            <Auth0Provider
                domain={process.env.REACT_APP_AUTH0_DOMAIN}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                redirectUri={window.location.origin}
            >
                <div>
                    <LoginButton />
                    <LogoutButton />
                    <TempProfile />
                </div>
            </Auth0Provider>
        );
    } else {
        return (
            <p>Don't load auth0</p>
        );
    }
};

export function LoginButton() {

    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => loginWithRedirect()}>Log in</button>
    );
};

export function LogoutButton() {

    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    );
};

// This function will not be used in the final product. USed now to ensure that
// we get all information
// TODO: store this information in the database (except for image)
function TempProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <div>Not authenticated</div>
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.given_name} {user.family_name}</h2>
                <p>{user.email}</p>
            </div>
    )
    );
};
