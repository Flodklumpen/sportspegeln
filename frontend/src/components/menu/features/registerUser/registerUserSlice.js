import { client } from '../../../../client';

const initialState = [];

export default function registerUserReducer(state = initialState, action) {
  switch (action.type) {
    // omit other reducer cases
    case "data/dataStored": {
      // Return new data state array with the new data at the end
      return [...state, action.payload];
    }
    default:
      return state
  }
}

// Thunk function
export function storeUser(email, given_name, family_name) {
  const user = {};
  user['email'] = email;
  user['given_name'] = given_name;
  user['family_name'] = family_name;

  return async function storeUserThunk(dispatch, getState) {
    const response = await client.post('/user/register', user );

    const stateBefore = getState();
    const theState = stateBefore.registerUser;
    console.log(' store Data before dispatch: ', theState);

    dispatch({ type: 'data/dataStored', payload: response.message });

    const stateAfter = getState();
    console.log('store Data after dispatch: ', stateAfter.registerUser);
  };
}
