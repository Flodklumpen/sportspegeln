import React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

export function Login() {
    let auth0 = null;

    const configureClient = async () => {

        auth0 = createAuth0Client({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID
        });
    };

    window.onload = async () => {
        await configureClient();
        updateUI();
        const isAuthenticated = await auth0.isAuthenticated;

        if (isAuthenticated) {
            return;
        }

        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0.handleRedirectCallback();
            updateUI();
            window.history.replaceState({}, document.title, "/");
        }
    };

    const updateUI = async () => {
        const isAuthenticated = await auth0.isAuthenticated;
        document.getElementById("btn-logout").disabled = !isAuthenticated;
        //document.getElementById("btn-login").disabled = isAuthenticated;
    };

    const login = async () => {
        console.log(auth0);
        await auth0.loginWithRedirect({
            redirect_uri: window.location.origin
        });
    };

    const logout = async () => {

    }

    const helloWorld = async () => {
        console.log("Hello world");
    }

    return (
        <div>
            <h2>SPA Authentication Sample</h2>
            <p>Welcome to our page!</p>
            <button id="btn-login" disabled={false} onClick={login}>Log in</button>
            <button id="btn-logout" disabled={true} onClick={() => logout()}>Log out</button>
            <button onClick={helloWorld}>hello</button>
        </div>
    )
}
