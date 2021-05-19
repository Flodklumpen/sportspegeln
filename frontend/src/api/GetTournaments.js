import { useEffect } from 'react';
import '../css/Tournaments.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchTournaments } from "../reducers/getTournaments";

export function GetTournaments() {

	const { user } = useAuth0();
	const dispatch = useDispatch();

	let currentState = useSelector((state) => state);

	const token = currentState.userToken['currentUserToken'];

	useEffect(() => {
		dispatch(fetchTournaments(user.email, token));
	}, [dispatch, user.email, token]);

	return null;
}
