import { client } from '../client';

const initialState = {
  editTournament: []
};

export default function editTournamentReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/tournamentEdit': {
      return {
        ...state,
        editTournament: action.payload
      };
    }
    default:
      return state
  }
}

export function editTournament(tournamentID, startDate, endDate, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['start_date'] = startDate;
  body['end_date'] = endDate;
  return async function editTournamentThunk(dispatch) {
    const response = await client.put('/tournament/edit_tournament', body, email, token);
    dispatch({ type: 'data/tournamentEdit', payload: response });
  };
}

export const selectEditTournament = (state) => state.editTournament;
