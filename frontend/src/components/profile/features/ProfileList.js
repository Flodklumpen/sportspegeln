import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './../Profile.module.css';
import {
  futureMatchReducer,
  pastMatchReducer,
  ownedTournamentReducer,
  competingTournamentReducer,
  selectFutureMatch,
  selectPastMatch,
  selectOwnedTournament,
  selectCompetingTournament
} from './profileListSlice';

export function ProfileList() {
  //TODO: get these from server
  const futureMatches = [
    {
      'tournament_name': 'Turnering 1',
      'date': '2021-04-03',
      'time': '15.30',
      'opponent': 'Lars'
    }
  ];

  const pastMatches = [
    {
      'tournament_name': 'Turnering 1',
      'date': '2021-04-03',
      'time': '15.30',
      'opponent': 'Lars',
      'result': 'Vann'
    }
  ];

  const ownedTournaments = [
    {
      'tournament_name': 'Min turnering',
      'start_date': '2020-01-01',
      'end_date': '2020-03-14',
    }
  ];

  const competingTournaments = [
    {
      'tournament_name': 'Någon annans turnering',
      'start_date': '2020-01-01',
      'end_date': '2020-03-14',
    }
  ];

  const futureMatchList = futureMatches.map((futureMatch) =>
    <li key="{futureMatch}">
      <b>Mot {futureMatch.opponent}</b><br />
      {futureMatch.date} kl. {futureMatch.time}<br />
      Turnering: {futureMatch.tournament_name}
    </li>
  );

  const pastMatchList = pastMatches.map((pastMatch) =>
    <li key="{pastMatch}">
      <b>Mot {pastMatch.opponent}</b><br />
      {pastMatch.date} kl. {pastMatch.time}<br />
      Turnering: {pastMatch.tournament_name}<br />
      Resultat: {pastMatch.result}
    </li>
  );

  const ownedTournamentsList = ownedTournaments.map((ownedTournament) =>
    <li key="{ownedTournament}">
      <b>{ownedTournament.tournament_name}</b><br />
      {ownedTournament.start_date} - {ownedTournament.end_date}<br />
      Hantera turnering
    </li>
  );

  const competingTournamentsList = competingTournaments.map((competingTournament) =>
    <li key="{competingTournament}">
      <b>{competingTournament.tournament_name}</b><br />
      {competingTournament.start_date} - {competingTournament.end_date}<br />
    </li>
  );

  const futureMatch = useSelector(selectFutureMatch);
  const pastMatch = useSelector(selectPastMatch);
  const ownedTournament = useSelector(selectOwnedTournament);
  const competingTournament = useSelector(selectCompetingTournament);

  const dispatch = useDispatch();

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
        <Row>
          <ul className={resource.class}>{list}</ul>
        </Row>
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
