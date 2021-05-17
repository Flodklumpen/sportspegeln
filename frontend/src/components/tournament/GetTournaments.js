import React, {useEffect} from 'react';
import './TournamentList.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchTournaments } from "./getTournamentsSlice";

export function GetTournaments() {

	const { user } = useAuth0();
	const dispatch = useDispatch();

	let currentState = useSelector((state) => state);

	const token = currentState.userToken['currentUserToken'];

	useEffect(() => {
		dispatch(fetchTournaments(user.email, token));
	}, [dispatch, user.email, token]);
}