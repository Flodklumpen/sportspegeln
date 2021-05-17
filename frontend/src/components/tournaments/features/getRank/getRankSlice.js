import { client } from "../../../../client";

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
    const response = await client.get('/tournaments/get_rank?tournaments=' + id, email, token);
    dispatch({type: 'data/dataLoaded', payload: response.data});
  }
}
