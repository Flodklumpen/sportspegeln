import React from 'react';
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { LogInLogOut } from "./features/LogInLogOut";

export function Login() {

    if (!navigator.userAgent.includes('jsdom')) {

        return (
            <Auth0Provider
                domain={process.env.REACT_APP_AUTH0_DOMAIN}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                redirectUri={window.location.origin}
            >
                <div>
                    <LogInLogOut />
                    <TempProfile />
                </div>
            </Auth0Provider>
        );
    } else {
        return (
            <p>Don't load auth0</p>
        );
    }
}

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
}
