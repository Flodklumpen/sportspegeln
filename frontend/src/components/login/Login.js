import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ToggleLogInButton } from "./features/ToggleLogInButton";
import { RegisterUser } from "./features/registerUser/RegisterUser";

export function Login() {
		return (
				<div>
					<ToggleLogInButton />
					{StoreProfileData()}
				</div>
		);
}

// TODO: send this information to backend
function StoreProfileData() {
	const { user, isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		const email = user.email;
		const firstName = user.given_name;
		const familyName = user.family_name;
		console.log(email);
		console.log(firstName);
		console.log(familyName);
	}

	return (
		<div>
			<RegisterUser/>
		</div>
	);
}
