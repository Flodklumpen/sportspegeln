import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      'time': '15:30',
      'opponent': 'Lars'
    },
    {
      'tournament_name': 'Turnering 1',
      'date': '',
      'time': '',
      'opponent': 'Märta'
    },
    {
      'tournament_name': 'Turnering 4',
      'date': '2022-04-20',
      'time': '18.00',
      'opponent': 'Bobby'
    }
  ]

  const matchList = futureMatches.map((futureMatch) =>
    <li>
      {futureMatch.date} {futureMatch.time} Mot {futureMatch.opponent}
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
            <img className="d-block d-md-none" onClick={onClickFunction} src={resource.arrow} alt="Visa/Dölj"/>
          </Col>
        </Row>
        <Row>
          <ul className={resource.class}>{list}</ul>
        </Row>
      </div>
    );
  }

  return (
    <div>
      {listMaker("futureMatch", "Kommande matcher", matchList)}
      {listMaker("pastMatch", "Tidigare matcher", matchList)}
      {listMaker("ownedTournament", "Turneringar jag äger", matchList)}
      {listMaker("competingTournament", "Turneringar jag tävlar i", matchList)}
    </div>
  );

}
