import { client } from "../../client";

const initialState = [];

export default function getTournamentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/dataLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchTournaments(email, token) {
  return async function fetchTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_tournaments', email, token);
    dispatch({type: 'data/dataLoaded', payload: response.data});

  }
}
