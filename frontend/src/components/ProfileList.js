import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../css/Profile.module.css';
import {
  futureMatchReducer,
  pastMatchReducer,
  ownedTournamentReducer,
  competingTournamentReducer,
  selectFutureMatch,
  selectPastMatch,
  selectOwnedTournament,
  selectCompetingTournament
} from '../reducers/profileList';
import { Match } from './Match';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchFutureMatches } from '../reducers/getFutureMatches';
import { fetchPastMatches } from '../reducers/getPastMatches';

export function ProfileList() {
  const { user } = useAuth0();

  //TODO: get these from server

  const placeholderTournament = {
    name: "Min turnering",
    startDate: "2020-01-01",
    endDate: "2021-12-31",
    owner: "Klas-Göran"
  }

  const placeholderTournament2 = {
    name: "Bästa turneringen nånsing bror",
    startDate: "2020-01-01",
    endDate: "",
    owner: "Tobbe"
  }

  let currentState = useSelector((state) => state);

  const token = currentState.userToken['currentUserToken'];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFutureMatches(user.email, token));
    dispatch(fetchPastMatches(user.email, token));
  }, [dispatch, user.email, token, currentState.createMatch, currentState.editMatch, currentState.reportMatch]);

  const futureMatches = currentState.futureMatches;
  const pastMatches = currentState.pastMatches;

  const ownedTournaments = [
    placeholderTournament,
    placeholderTournament,
    placeholderTournament2
  ];

  const competingTournaments = [
    placeholderTournament,
    placeholderTournament,
    placeholderTournament2
  ];

  const getOpponent = (match) => {
    if (user.name === match.defender) {
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
  }

  const getMatchResult = (match) => {
    var myScore = 0;
    var opponentScore = 0;
    if (user.name === match.defender) {
      myScore = match.score_defender;
      opponentScore = match.score_challenger;
    } else {
      myScore = match.score_challenger;
      opponentScore = match.score_defender;
    };
    if (myScore === 0 && opponentScore === 0) {
      return (
        <div>Resultat ej rapporterade</div>
      );
    } else {
      return (
        <div>
          Mina poäng: {myScore}<br />
          Motståndarens poäng: {opponentScore}
        </div>
      );
    }
  }

  const futureMatchList = futureMatches.map((futureMatch, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          <Match report={false} match={futureMatch}/>
        </Col>
        <Col xs={10}>
          <b>Mot {getOpponent(futureMatch)}</b><br />
          {getMatchDateTime(futureMatch)}
          Turnering: {futureMatch.tournament}
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const pastMatchList = pastMatches.map((pastMatch, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          <Match report={true} match={pastMatch} />
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

  const ownedTournamentsList = ownedTournaments.map((ownedTournament, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          Knapp?
        </Col>
        <Col xs={10}>
          <b>{ownedTournament.name}</b><br />
          {ownedTournament.startDate} - {ownedTournament.endDate}<br />
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const competingTournamentsList = competingTournaments.map((competingTournament, index) =>
    <ListGroup.Item as="li" key={index}>
      <Row>
        <Col xs={2}>
          Knapp?
        </Col>
        <Col xs={10}>
          <b>{competingTournament.name}</b><br />
          {competingTournament.startDate} - {competingTournament.endDate}<br />
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const futureMatch = useSelector(selectFutureMatch);
  const pastMatch = useSelector(selectPastMatch);
  const ownedTournament = useSelector(selectOwnedTournament);
  const competingTournament = useSelector(selectCompetingTournament);



  const listMaker = (listName, title, list) => {
    let onClickFunction;
    let resource;
    switch(listName) {
      case "futureMatch":
        onClickFunction = ()=>dispatch(futureMatchReducer());
        resource = futureMatch;
        break;
      case "pastMatch":
        onClickFunction = ()=>dispatch(pastMatchReducer());
        resource = pastMatch;
        break;
      case "ownedTournament":
        onClickFunction = ()=>dispatch(ownedTournamentReducer());
        resource = ownedTournament;
        break;
      case "competingTournament":
        onClickFunction = ()=>dispatch(competingTournamentReducer());
        resource = competingTournament;
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
              <img className={`d-block d-sm-none ${styles.show_more_button}`} onClick={onClickFunction} src={resource.arrow} alt="Visa/Dölj"/>
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