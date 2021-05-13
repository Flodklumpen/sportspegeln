import { client } from "../../../../client";

const initialState = [];

export default function getUserDataReducer(state = initialState, action) {
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

export function fetchUserData(email, token) {
  return async function fetchUserDataThunk(dispatch) {
    const response = await client.get('/user/get_user_data?email=' + email, email, token);
    dispatch({type: 'data/dataLoaded', payload: response.data});
  }
}
