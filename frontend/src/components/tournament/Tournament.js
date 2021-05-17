import React from 'react';
import { useSelector } from "react-redux";
import {selectTournament, updateTournament} from "./tournamentSlice";
import styles from "./Tournament.module.css";
import Table from "react-bootstrap/Table";
import { GetRank } from "./GetRank";

export function Tournament() {

	const tournament = useSelector(selectTournament);

	//TODO: Get from server with <GetRank /> when backend is ready.
	const rank = [
		{
			'first_name': 'Tina',
			'family_name': 'Stark'
		},
		{
			'first_name': 'Ylva',
			'family_name': 'Viking'
		},
		{
			'first_name': 'Inga-Linn',
			'family_name': 'Nallepuhsson'
		},
		{
			'first_name': 'Gösta',
			'family_name': 'Örn'
		},
		{
			'first_name': 'Nilla',
			'family_name': 'Varg'
		}
	];

	const listMaker = rank.map((competitor, index) =>
	  <tr key={index+1}>
	    <td className={styles.indexCol}>{ index+1 }</td>
      <td className={styles.competitorCol}>{competitor.first_name} {competitor.family_name}</td>
    </tr>
	);

	return (
		<div>
			<h1>{ tournament.tournament_name }</h1>
			<Table striped bordered hover size="sm" className={styles.Table}>
				<thead>
			    <tr>
				    <th>#</th>
			      <th>Ställning</th>
			    </tr>
			  </thead>
				<tbody>
			  { listMaker }
			  </tbody>
			</Table>
		</div>
	);
}

export default Tournament;
