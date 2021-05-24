import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { selectTournament } from "../../reducers/tournament";
import styles from "../../css/Tournament.module.css";
import Table from "react-bootstrap/Table";
import { GetRank } from "../../api/GetRank";
import { selectRank } from "../../reducers/getRank";
import { joinTournament } from "../../reducers/joinTournament";
import { selectStoreToken } from "../../reducers/storeToken";
import { selectUserData } from "../../reducers/getUserData";
import Button from "react-bootstrap/Button";

export function Tournament() {

	const dispatch = useDispatch();

	const tournament = useSelector(selectTournament);
	const rank = useSelector(selectRank);
	const token = useSelector(selectStoreToken);
	const userData = useSelector(selectUserData);

	const listMaker = rank.map((competitor, index) =>
	  <tr key={index+1}>
	    <td className={styles.indexCol}>{ index+1 }</td>
      <td className={styles.competitorCol}>{competitor[0]}</td>
    </tr>
	);

	return (
		<div>
			<GetRank />
			<Button className={styles.JoinTournament} onClick={() => dispatch(joinTournament(tournament.id, userData.email, token))}>Delta</Button>
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
