import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRank } from "../reducers/getRank";
import { selectTournament } from "../reducers/tournament";

export function GetRank() {
	const dispatch = useDispatch();

	const tournament = useSelector(selectTournament);
	let currentState = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchRank(tournament.id));
  }, [dispatch, tournament.id, currentState.joinTournament]);

	return null;
}
