import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { updateTournament } from "../../reducers/tournament";
import { useSelector } from "react-redux";
import {fetchAllTournaments, selectTournaments} from "../../reducers/getTournaments";
import styles from '../../css/Tournaments.module.css';

export function Tournaments() {

	const dispatch = useDispatch();
	let currentState = useSelector((state) => state);

	const tournaments = useSelector(selectTournaments);

	useEffect(() => {
		dispatch(fetchAllTournaments());
	}, [dispatch, currentState.createTournament]);

	const listTournaments = tournaments.sort(
		function (a, b) {
			if (a.start_date > b.start_date) {
				return -1;
			}
			if (a.start_date < b.start_date) {
				return 1;
			}
			return 0;
		}
	).map((tournament) =>
	  <tr key={tournament.id}>
	    <td><Link onClick={() => dispatch(updateTournament(tournament))} to="/tournament"
	              className={styles.tournamentLink}>{tournament.name}</Link></td>
      <td>{tournament.start_date}</td>
	    <td>{tournament.owner_name}</td>
    </tr>
	);

	return (
		<div>
			<Table striped bordered hover size="sm">
			  <thead>
			    <tr>
			      <th>Turnering</th>
				    <th>Startdatum</th>
			      <th>Ägare</th>
			    </tr>
			  </thead>
			  <tbody>
			  { listTournaments }
			  </tbody>
			</Table>
		</div>
	);
}
