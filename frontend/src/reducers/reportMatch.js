import { client } from '../client';

const initialState = [];

export default function reportMatchReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/matchReported': {
      return action.payload;
    }
    default:
      return state
  }
}

export function reportMatch(tournamentID, matchID, date, time, scoreChallenger, scoreDefender, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['match_id'] = matchID;
  body['date'] = date;
  body['time'] = time;
  body['score_challenger'] = scoreChallenger;
  body['score_defender'] = scoreDefender;

  return async function reportMatchThunk(dispatch) {
    const response = await client.put('/tournament/report_match', body, email, token);
    dispatch({ type: 'data/matchReported', payload: response });
  };
}
