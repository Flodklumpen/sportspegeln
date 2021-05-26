import { client } from "../client";

const initialState = [];

export default function getRankReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/rankLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchRank(id) {
  return async function fetchRankThunk(dispatch) {
    const response = await client.get('/tournament/get_rank?tournament=' + id, "", "");
    dispatch({type: 'data/rankLoaded', payload: response.data});
  }
}

export const selectRank = (state) => state.rank;
