import { client } from '../client';

const initialState = [];

export default function createMatchReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/matchCreated': {
      return action.payload;
    }
    default:
      return state
  }
}

export function createMatch(tournamentID, challenger, defender, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['defender'] = defender;
  body['challenger'] = challenger;
  return async function createMatchThunk(dispatch) {
    const response = await client.post('/tournament/create_challenge', body, challenger, token);
    dispatch({ type: 'data/matchCreated', payload: response });
  };
}
