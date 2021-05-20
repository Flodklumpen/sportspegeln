import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserData } from "../reducers/getUserData";

/**
 * @return {null}
 */
export function GetUserData() {

	const { user } = useAuth0();
	const dispatch = useDispatch();

	let currentState = useSelector((state) => state);

	const token = currentState.userToken['currentUserToken'];

	useEffect(() => {
		dispatch(fetchUserData(user.email, token));
  }, [dispatch, user.email, token]);

	return null;
}
