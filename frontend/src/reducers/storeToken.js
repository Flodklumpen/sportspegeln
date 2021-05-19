import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUserToken: ''
};

export const storeTokenSlice = createSlice({
	name: "userToken",
	initialState,
	reducers: {
		updateState: (state, token) => {
			state.currentUserToken = "Bearer " + token.payload;
		}
	}
});

export const { updateState } = storeTokenSlice.actions;

export const selectStoreToken = (state) => state.userToken.currentUserToken;

export default storeTokenSlice.reducer;
