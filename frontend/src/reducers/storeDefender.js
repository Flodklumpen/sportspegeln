import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	defender: []
};

export const storeDefenderSlice = createSlice({
	name: "currentDefender",
	initialState,
	reducers: {
		updateCurrentDefender: (state, defender) => {
			state.defender = defender.payload;
		}
	}
});

export const { updateCurrentDefender } = storeDefenderSlice.actions;

export const selectStoreDefender = (state) => state.currentDefender;

export default storeDefenderSlice.reducer;
