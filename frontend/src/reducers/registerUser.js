import { client } from '../client';

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
export function storeUser(email, givenName, familyName, userID, token) {
  const user = {};
  user['email'] = email;
  user['given_name'] = givenName;
  user['family_name'] = familyName;
  user['user_id'] = userID;

  return async function storeUserThunk(dispatch) {
    const response = await client.post('/user/register', user, email, token);
    dispatch({ type: 'data/dataStored', payload: response.message });
  };
}
