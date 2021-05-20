import { client } from '../client';

const initialState = [];

export default function editMatchReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/matchChanged': {
      return action.payload;
    }
    default:
      return state
  }
}

export function editMatch(tournamentID, matchID, date, time, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['match_id'] = matchID;
  body['date'] = date;
  body['time'] = time;
  return async function editMatchThunk(dispatch) {
    const response = await client.put('/tournament/edit_match', body, email, token);
    dispatch({ type: 'data/matchChanged', payload: response });
  };
}
