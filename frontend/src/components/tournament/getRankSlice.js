import { client } from "../../client";

const initialState = [];

export default function getRankReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/dataLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchRank(email, id, token) {
  return async function fetchRankThunk(dispatch) {
    const response = await client.get('/tournament/get_rank?tournament=' + id, email, token);
    dispatch({type: 'data/dataLoaded', payload: response.data});
  }
}
