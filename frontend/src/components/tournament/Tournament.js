import React from 'react';
import { useSelector } from "react-redux";
import { selectTournament } from "../../reducers/tournament";
import styles from "../../css/Tournament.module.css";
import Table from "react-bootstrap/Table";
import { GetRank } from "../../api/GetRank";
import { selectRank } from "../../reducers/getRank";

export function Tournament() {

	const tournament = useSelector(selectTournament);
	const rank = useSelector(selectRank);

	const listMaker = rank.map((competitor, index) =>
	  <tr key={index+1}>
	    <td className={styles.indexCol}>{ index+1 }</td>
      <td className={styles.competitorCol}>{competitor}</td>
    </tr>
	);

	return (
		<div>
			<GetRank />
			<h1>{ tournament.name }</h1>
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
