import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import { useSelector } from 'react-redux'

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
	const currentState = useSelector((state) => state);
	console.log("currant state: ", currentState.userData);
	const cState = currentState.userData;

	return (
		<div>
			<p>hej { cState['email'] } </p>
		</div>
	);

}