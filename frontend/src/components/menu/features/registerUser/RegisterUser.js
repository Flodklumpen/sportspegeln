//import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { storeUser } from "./registerUserSlice";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";

export function RegisterUser() {

	const { user } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeUser(user.email, user.given_name, user.family_name));
  }, [dispatch, user.email, user.given_name, user.family_name]);

	return null;
}
