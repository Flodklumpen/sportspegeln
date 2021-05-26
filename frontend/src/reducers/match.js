import { client } from '../client';

const initialState = {
  futureMatches: [],
  pastMatches: []
};

export default function matchReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/futureMatchesLoaded' : {
      return {
        ...state,
        futureMatches: action.payload
      }
    }
    case 'data/pastMatchesLoaded': {
      return {
        ...state,
        pastMatches: action.payload
      };
    }
    default:
      return state
  }
}

export function fetchFutureMatches(email, token) {
  return async function fetchFutureMatchesThunk(dispatch) {
    const response = await client.get('/tournament/get_future_matches?email=' + email, email, token);
    dispatch({type: 'data/futureMatchesLoaded', payload: response.data});

  }
}

export function fetchPastMatches(email, token) {
  return async function fetchPastMatchesThunk(dispatch) {
    const response = await client.get('/tournament/get_past_matches?email=' + email, email, token);
    dispatch({type: 'data/pastMatchesLoaded', payload: response.data});

  }
}

export const selectFutureMatches = (state) => state.match.futureMatches;
export const selectPastMatches = (state) => state.match.pastMatches;
