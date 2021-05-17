import { client } from "../../client";

const initialState = [];

export default function getRankReducer(state = initialState, action) {
  switch (action.type) {
    // omit other reducer cases
    case 'data/dataLoaded': {
      // Replace the existing state entirely by returning the new value
      return action.payload
    }
    default:
      return state
  }
}

export function fetchRank(email, id, token) {
  return async function fetchUserDataThunk(dispatch) {
    const response = await client.get('/tournament/get_rank?tournament=' + id, email, token);
    dispatch({type: 'data/dataLoaded', payload: response.data});
  }
}
