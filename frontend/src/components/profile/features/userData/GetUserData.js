import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserData } from "./getUserDataSlice";

export function GetUserData() {

	const { user } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserData(user.email));
  }, [dispatch, user.email]);

	const currentState = useSelector((state) => state);
	const cState = currentState.userData;

	return (
		<div>
			<p>Hej { cState['first_name'] } { cState['family_name'] } </p>
		</div>
	);
}