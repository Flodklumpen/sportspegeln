//import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { storeUser } from "./registerUserSlice";
import { useDispatch } from 'react-redux'

export function RegisterUser() {

	const { user, isAuthenticated } = useAuth0();
	const dispatch = useDispatch();

	if (isAuthenticated) {
		dispatch(storeUser(user.email, user.given_name, user.family_name));
		}

	return null;
}
