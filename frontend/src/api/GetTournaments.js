import { useEffect } from 'react';
import '../css/Tournaments.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTournaments } from "../reducers/getTournaments";

/**
 * @return {null}
 */
export function GetTournaments() {

	const dispatch = useDispatch();

	let currentState = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchAllTournaments());
	}, [dispatch, currentState.createTournament]);

	return null;
}
