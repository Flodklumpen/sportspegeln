import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	defender: {
		name: "",
		email: "",
		rank: -1
	}
};

export const storeDefenderSlice = createSlice({
	name: "currentDefender",
	initialState,
	reducers: {
		updateCurrentDefender: (state, defender) => {
			state.defender.name = defender.payload[0].name;
			state.defender.email = defender.payload[0].email;
			state.defender.rank = defender.payload[1];
		}
	}
});

export const { updateCurrentDefender } = storeDefenderSlice.actions;

export const selectStoreDefender = (state) => state.currentDefender.defender;

export default storeDefenderSlice.reducer;
