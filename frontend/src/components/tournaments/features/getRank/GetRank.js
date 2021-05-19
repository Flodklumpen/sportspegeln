import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { fetchRank } from "./getRankSlice";
import { selectTournament } from "../tournament/tournamentSlice";

export function GetRank() {
	const { user } = useAuth0();
	const dispatch = useDispatch();

	const tournament = useSelector(selectTournament);
	let currentState = useSelector((state) => state);

	const token = currentState.userToken['currentUserToken'];

	useEffect(() => {
		dispatch(fetchRank(user.email, tournament.id, token));
  }, [dispatch, user.email, tournament.id, token]);
}
