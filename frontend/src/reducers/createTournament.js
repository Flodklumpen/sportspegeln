import { client } from "../client";

const initialState = [];

export default function createTournamentReducer(state = initialState, action) {
	switch (action.type) {
		case "data/tournamentCreated": {
			return [...state, action.payload];
		}
		default:
			return state;
	}
}

export function createTournament(tournamentName, owner, startDate, endDate, token) {
	const tournament = {};
	tournament['tournament_name'] = tournamentName;
	tournament['owner'] = owner;

	if (startDate) {
		tournament['start_date'] = startDate;
	}
	if (endDate) {
		tournament['end_date'] = endDate;
	}
	console.log(tournament);

	return async function createTournamentThunk(dispatch) {
		const response = await client.post('/tournament/create_tournament', tournament, owner, token);
    dispatch({ type: 'data/tournamentCreated', payload: response.message });
	};
}