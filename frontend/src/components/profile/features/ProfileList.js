/*
this.props.[variable] can get variable
use slice to decide state on mobile (hidden/shown)
*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  futureMatchList,
  pastMatchList,
  ownedTournamentsList,
  competingTournamentList,
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

  const futureMatchClass = useSelector(selectFutureMatch);
  const pastMatchClass = useSelector(selectPastMatch);
  const ownedTournamentsClass = useSelector(selectOwnedTournament);
  const competingTournamentClass = useSelector(selectCompetingTournament);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>
        Kommande matcher
      </h2>
      <button className="d-block d-md-none" onClick={()=>dispatch(futureMatchList())}>click</button>
      <ul className={futureMatchClass}>{matchList}</ul>
      <h2>
        Tidigare matcher
      </h2>
      <button className="d-block d-md-none" onClick={()=>dispatch(pastMatchList())}>click</button>
      <ul className={pastMatchClass}>{matchList}</ul>
      <h2>
        Turneringar jag äger
      </h2>
      <button className="d-block d-md-none" onClick={()=>dispatch(ownedTournamentsList())}>click</button>
      <ul className={ownedTournamentsClass}>{matchList}</ul>
      <h2>
        Turneringar jag tävlar i
      </h2>
      <button className="d-block d-md-none" onClick={()=>dispatch(competingTournamentList())}>click</button>
      <ul className={competingTournamentClass}>{matchList}</ul>
    </div>
  );

}
