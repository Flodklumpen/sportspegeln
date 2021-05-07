import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from './client';

const initialState = [];

export default function registerUserReducer(state = initialState, action) {
  switch (action.type) {
    // omit other reducer cases
    case 'data/dataLoaded': {
      // Replace the existing state entirely by returning the new value
      console.log("action.payload: ", action.payload);
      return action.payload
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchProfileData(dispatch, getState) {
  const response = await client.get('/user/get_info');

  const stateBefore = getState();
  console.log('Data before dispatch: ', stateBefore.userData);

  dispatch({ type: 'data/dataLoaded', payload: response.data });

	const stateAfter = getState();
  console.log('Data after dispatch: ', stateAfter.userData);
}
