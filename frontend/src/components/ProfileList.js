import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import EditTournament from './tournament/EditTournament';
import { Match } from './Match';
import { selectUserData } from "../reducers/getUserData";
import { selectEditTournament } from '../reducers/editTournament';
import { selectStoreToken } from "../reducers/storeToken";
import { fetchCompetingTournaments, selectCompetingTournaments } from "../reducers/getTournaments";
import { fetchOwnedTournaments, selectOwnedTournaments } from "../reducers/getTournaments";
import {
  fetchPastMatches,
  fetchFutureMatches,
  selectFutureMatches,
  selectPastMatches
} from '../reducers/match';
import {
  toggleFutureMatchState,
  togglePastMatchState,
  toggleOwnedTournamentState,
  toggleCompetingTournamentState,
  selectFutureMatchState,
  selectPastMatchState,
  selectOwnedTournamentsState,
  selectCompetingTournamentsState
} from '../reducers/profileList';
import styles from '../css/Profile.module.css';

export function ProfileList() {

  const dispatch = useDispatch();
  let currentState = useSelector((state) => state);

  const token = useSelector(selectStoreToken);
  const userData = useSelector(selectUserData);
  const tournamentEdited = useSelector(selectEditTournament);
  const userName = userData.first_name + " " + userData.family_name;

  useEffect(() => {
    dispatch(fetchFutureMatches(userData.email, token));
    dispatch(fetchPastMatches(userData.email, token));
    dispatch(fetchCompetingTournaments(userData.email, token));
    dispatch(fetchOwnedTournaments(userData.email, token));
  }, [dispatch, userData.email, token, currentState.changeMatch, tournamentEdited]);

  const futureMatches = useSelector(selectFutureMatches);
  const pastMatches = useSelector(selectPastMatches);
  const competingTournaments = useSelector(selectCompetingTournaments);
  const ownedTournaments = useSelector(selectOwnedTournaments);

  const getOpponent = (match) => {
    if (userName === match.defender) {
      return match.challenger;
    } else {
      return match.defender;
    }
  };

  const getMatchDateTime = (match) => {
    let str = match.date;
    if (match.time) {
      str = str + ", kl."+match.time;
    }
    if (str) {
      return (
        <div>{str}</div>
      );
    }
  };

  const getMatchResult = (match) => {
    let myScore = 0;
    let opponentScore = 0;
    if (userName === match.defender) {
      myScore = match.score_defender;
      opponentScore = match.score_challenger;
    } else {
      myScore = match.score_challenger;
      opponentScore = match.score_defender;
    }
    if (!match.reported) {
      return (
        <div>Resultat ej rapporterat</div>
      );
    } else {
      return (
        <div>
          Mina poäng: {myScore}<br />
          Motståndarens poäng: {opponentScore}
        </div>
      );
    }
  };

  function compareMatches(a, b) {
    if (!a.reported && !b.reported) {
      return 0;
    }
    if (!a.reported) {
      return -1;
    }
    if (!b.reported) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    // dates are equal, sort according to time
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  }

  const competingTournamentsDict = {};
  for (const tournament of competingTournaments) {
    competingTournamentsDict[tournament.id] = tournament;
  }

  const futureMatchList = futureMatches.sort(compareMatches).map((futureMatch, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          <Match
            report={false}
            match={futureMatch}
            tournament={competingTournamentsDict[futureMatch.tournament_id]}
          />
        </Col>
        <Col xs={10}>
          <b>Mot {getOpponent(futureMatch)}</b><br />
          {getMatchDateTime(futureMatch)}
          Turnering: {futureMatch.tournament}
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const pastMatchList = pastMatches.sort(compareMatches).map((pastMatch, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          <Match
            report={true}
            match={pastMatch}
            tournament={competingTournamentsDict[pastMatch.tournament_id]}
          />
        </Col>
        <Col xs={10}>
          <b>Mot {getOpponent(pastMatch)}</b><br />
          {getMatchDateTime(pastMatch)}
          Turnering: {pastMatch.tournament}<br />
          {getMatchResult(pastMatch)}
        </Col>
      </Row>
    </ListGroup.Item>
  );

  function compareTournaments(a, b) {
    if (a.start_date > b.start_date) {
      return -1;
    }
    if (a.start_date < b.start_date) {
      return 1;
    }
    // start dates are equal, sort according to end date
    if (a.end_date > b.end_date || a.end_date === null) {
      return -1;
    }
    if (a.end_date < b.end_date) {
      return 1;
    }
    return 0;
  }

  const ownedTournamentsList = ownedTournaments.sort(compareTournaments).map((ownedTournament, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          <EditTournament tournament={ownedTournament} />
        </Col>
        <Col xs={10}>
          <b>{ownedTournament.name}</b><br />
          {ownedTournament.start_date} - {ownedTournament.end_date}<br />
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const competingTournamentsList = competingTournaments.sort(compareTournaments).map((competingTournament, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={10}>
          <b>{competingTournament.name}</b><br />
          {competingTournament.start_date} - {competingTournament.end_date}<br />
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const futureMatchState = useSelector(selectFutureMatchState);
  const pastMatchState = useSelector(selectPastMatchState);
  const ownedTournamentState = useSelector(selectOwnedTournamentsState);
  const competingTournamentState = useSelector(selectCompetingTournamentsState);



  const listMaker = (listName, title, list) => {
    let onClickFunction;
    let resource;
    switch(listName) {
      case "futureMatch":
        onClickFunction = ()=>dispatch(toggleFutureMatchState());
        resource = futureMatchState;
        break;
      case "pastMatch":
        onClickFunction = ()=>dispatch(togglePastMatchState());
        resource = pastMatchState;
        break;
      case "ownedTournament":
        onClickFunction = ()=>dispatch(toggleOwnedTournamentState());
        resource = ownedTournamentState;
        break;
      case "competingTournament":
        onClickFunction = ()=>dispatch(toggleCompetingTournamentState());
        resource = competingTournamentState;
        break;
      default:
        return (<div>Unknown</div>);
    }
    return (
      <div>
      <ListGroup as="ul">
        <ListGroup.Item as="li" id={listName}>
          <Row>
            <Col xs={10}>
              <h2>
                {title}
              </h2>
            </Col>
            <Col xs={2}>
              <img className={`d-block d-sm-none ${styles.show_more_button}`} onClick={onClickFunction}
                   src={resource.arrow} alt="Visa/Dölj"/>
            </Col>
          </Row>
        </ListGroup.Item>
        <div className={resource.class}>
        {list}
        </div>
      </ListGroup>
      </div>
    );
  };

  return (
    <div>
      {listMaker("futureMatch", "Kommande matcher", futureMatchList)}
      {listMaker("pastMatch", "Tidigare matcher", pastMatchList)}
      {listMaker("ownedTournament", "Turneringar jag äger", ownedTournamentsList)}
      {listMaker("competingTournament", "Turneringar jag tävlar i", competingTournamentsList)}
    </div>
  );

}
