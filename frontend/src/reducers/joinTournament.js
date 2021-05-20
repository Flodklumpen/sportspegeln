import { client } from '../client';

const initialState = [];

export default function joinTournamentReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/tournamentJoined': {
      return action.payload
    }
    default:
      return state
  }
}

export function joinTournament(tournamentID, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['competitor'] = email;
  return async function createMatchThunk(dispatch) {
    const response = await client.post('/tournament/add_competitor', body, email, token);
    dispatch({ type: 'data/tournamentJoined', payload: response });
  };
}
