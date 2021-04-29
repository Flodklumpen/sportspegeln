import React from 'react';
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { ToggleLogInButton } from "./features/ToggleLogInButton";

export function Login() {

	if (!navigator.userAgent.includes('jsdom')) {
			return (
				<Auth0Provider
					domain={process.env.REACT_APP_AUTH0_DOMAIN}
					clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
					redirectUri={window.location.origin}
				>
					<div>
						<ToggleLogInButton />
						<StoreProfileData />
					</div>
				</Auth0Provider>
			);
	} else {
		return (
			<p>Don't load auth0</p>
		);
	}
}

// TODO: send this information to backend
export function StoreProfileData() {
	const { user, isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		const email = user.email;
		const firstName = user.given_name;
		const familyName = user.family_name;

		/* This is only returned to avoid warnings */
		return (
			<div>
        Email: { email } <br />
        Förnamn: { firstName } <br />
        Efternamn: { familyName } <br />
      </div>
		);
	}

	return null;


}
