import React from 'react';
import Table from "react-bootstrap/Table";
import {
	Link
} from "react-router-dom";
import './TournamentList.module.css';
import styles from './TournamentList.module.css';
import { useDispatch } from "react-redux";
import { updateTournament } from "./tournamentSlice";

export function TournamentList() {
	const dispatch = useDispatch();

	//TODO: get these from server
	const tournaments = [
		{
			'id': 1,
			'tournament_name': 'Stegen',
			'start_date': '2021-01-01',
			'city': 'Linköping',
			'owner': 'Eva Kronhjortsson'
		},
		{
			'id': 2,
			'tournament_name': 'Stegen',
			'start_date': '2021-04-20',
			'city': 'Stockholm',
			'owner': 'Lotta Mariasdotter'
		}
		];

	const listTournaments = tournaments.map((tournament) =>
	  <tr key={tournament.id}>
	    <td><Link onClick={() => dispatch(updateTournament(tournament))} to="/tournament" className={styles.tournamentLink}>{tournament.tournament_name}</Link></td>
      <td>{tournament.start_date}</td>
      <td>{tournament.city}</td>
	    <td>{tournament.owner}</td>
    </tr>
	);


	return (
			<Table striped bordered hover size="sm" className="tournamentTable">
			  <thead>
			    <tr>
			      <th>Turnering</th>
				    <th>Startdatum</th>
			      <th>Ort</th>
			      <th>Ägare</th>
			    </tr>
			  </thead>
			  <tbody>
			  { listTournaments }
			  </tbody>
			</Table>
	);
}
