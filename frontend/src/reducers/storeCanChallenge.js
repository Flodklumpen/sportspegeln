import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	canChallenge: false
};

export const storeCanChallengeSlice = createSlice({
	name: "canChallenge",
	initialState,
	reducers: {
		updateCanChallenge: (state, canChallenge) => {
			state.canChallenge = canChallenge.payload;
		}
	}
});

export const { updateCanChallenge } = storeCanChallengeSlice.actions;

export const selectCanChallenge = (state) => state.canChallenge;

export default storeCanChallengeSlice.reducer;
