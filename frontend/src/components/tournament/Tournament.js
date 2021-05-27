import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { updateCurrentDefender, selectStoreDefender } from "../../reducers/storeDefender";
import { updateCanChallenge, selectCanChallenge } from "../../reducers/storeCanChallenge";
import { selectTournament } from "../../reducers/tournament";
import { fetchRank, selectRank } from "../../reducers/getRank";
import { selectStoreToken } from "../../reducers/storeToken";
import { selectUserData } from "../../reducers/getUserData";
import { joinTournament } from "../../reducers/joinTournament";
import { createMatch } from "../../reducers/changeMatch";
import styles from "../../css/Tournament.module.css";

export function Tournament(props) {

	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	let currentState = useSelector((state) => state);

	const userData = useSelector(selectUserData);
	const token = useSelector(selectStoreToken);
	const tournament = useSelector(selectTournament);
	const rank = useSelector(selectRank);
	const currentDefender = useSelector(selectStoreDefender);
	const canChallenge = useSelector(selectCanChallenge);

	const handleClose = () => {
		setShow(false);
		dispatch(updateCanChallenge(false));
	};

	useEffect(() => {
		dispatch(fetchRank(tournament.id));
  }, [dispatch, tournament.id, currentState.joinTournament]);

	const checkRank = (pos) => {
		let i;

		for (i = pos+1; i < pos+4; i++) {
			if (!rank[i]) {
				break;
			}
			if (rank[i][1] === userData.email) {
				dispatch(updateCanChallenge(true));
			}
		}
		setShow(true);
	};

	const listMaker = rank.map((competitor, index) =>
	  <tr key={index+1}>
	    <td className={styles.indexCol}>{ index+1 }</td>
		  <td className={styles.competitorCol} onClick={() => {dispatch(updateCurrentDefender(competitor));
		                                                                checkRank(index);}}
		  >
			  {competitor[0]}</td>
    </tr>
	);

	return (
		<div>
			{ props.authenticated ?
				<Button className={styles.JoinTournament} onClick={() => dispatch(joinTournament(
					tournament.id, userData.email, token))}
				>
					Delta
				</Button>
				:
				''
			}
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

			{ props.authenticated ?
				<Modal show={show} onHide={ handleClose }>
					<Modal.Header closeButton>
	          <Modal.Title>Utmaning</Modal.Title>
	        </Modal.Header>
							{	canChallenge.canChallenge ?
									<div>
										<Modal.Body> Vill du utmana {currentDefender.name}? </Modal.Body>
										<Modal.Footer>
											<Button variant="secondary" onClick={handleClose}>
			                  Avbryt
			                </Button>
											<Button variant="primary" onClick={ () => {handleClose();
																																dispatch(createMatch(
																																	tournament.id, userData.email,
																																	currentDefender.email, token));
																																alert("Utmaningen har skickats. Lycka till!")}}>
			                  Ja
			                </Button>
										</Modal.Footer>
									</div>
									:
									<div>
										<Modal.Body> Du kan endast utmana de som är högst tre steg ovanför dig </Modal.Body>
										<Modal.Footer>
											<Button variant="secondary" onClick={handleClose}>
												Stäng
											</Button>
										</Modal.Footer>
									</div>
							}
				</Modal>
				:
				''
			}
		</div>
	);
}

export default Tournament;
