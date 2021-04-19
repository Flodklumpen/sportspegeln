import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {

    const { isAuthenticated } = useAuth0();

    console.log(isAuthenticated);

    return (
        <div>
            <LoginButton />
            <LogoutButton />
            <TempProfile />
        </div>
    );
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
