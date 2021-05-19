import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTournament: []
};

export const tournamentSlice = createSlice({
	name: "tournament",
	initialState,
	reducers: {
		updateTournament: (state, action) => {
			state.currentTournament = action.payload;
		}
	}
});

export const { updateTournament } = tournamentSlice.actions;

export const selectTournament = (state) => state.tournament.currentTournament;

export default tournamentSlice.reducer;
