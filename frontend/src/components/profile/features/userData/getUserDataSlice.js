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

// Thunk function
export function fetchUserData(email) {
  console.log("email: ", email);
  return async function fetchUserDataThunk(dispatch, getState) {
    const response = await client.get('/user/get_user_data/' + email);
    const stateBefore = getState();
    console.log('get Data before dispatch: ', stateBefore.userData);

    dispatch({type: 'data/dataLoaded', payload: response.data});

    const stateAfter = getState();
    console.log('get Data after dispatch: ', stateAfter.userData);
  }
}
