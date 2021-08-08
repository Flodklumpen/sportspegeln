import { client } from "../client";

const initialState = {
  nrOfChallenges: {}
};

export default function getNrOfChallengesReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/nrOfChallenges': {
      return {
        ...state,
        nrOfChallenges: action.payload
      }
    }
    default:
      return state
  }
}

export function fetchNrOfChallenges(email, token) {
  return async function fetchNrOfChallengesThunk(dispatch) {
    const response = await client.get('/tournament/get_new_challenges?email=' + email, email, token);
    if (response) {
      dispatch({type: 'data/nrOfChallenges', payload: response.data});
    }
  }
}

export function resetNrOfChallenges() {
  return async function resetNrOfChallengesThunk(dispatch) {
    dispatch({type: 'data/nrOfChallenges', payload: {}});
  }
}

export const selectNrOfChallenges = (state) => state.nrOfChallenges.nrOfChallenges;
