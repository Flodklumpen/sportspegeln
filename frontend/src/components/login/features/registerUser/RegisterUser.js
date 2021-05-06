import React from 'react';
import {useAuth0} from "@auth0/auth0-react";

export function RegisterUser() {
	const { isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		/*const email = user.email;
		const firstName = user.given_name;
		const familyName = user.family_name;
		console.log(email);
		console.log(firstName);
		console.log(familyName);
		 */

	}
}