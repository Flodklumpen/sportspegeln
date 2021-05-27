import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	defender: {
		name: "",
		email: ""
	}
};

export const storeDefenderSlice = createSlice({
	name: "currentDefender",
	initialState,
	reducers: {
		updateCurrentDefender: (state, defender) => {
			state.defender.name = defender.payload[0];
			state.defender.email = defender.payload[1];
		}
	}
});

export const { updateCurrentDefender } = storeDefenderSlice.actions;

export const selectStoreDefender = (state) => state.currentDefender.defender;

export default storeDefenderSlice.reducer;
