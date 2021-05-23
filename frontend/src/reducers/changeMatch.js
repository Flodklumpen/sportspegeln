import { client } from '../client';

const initialState = {
  createMatch: [],
  editMatch: [],
  reportMatch: []
};

export default function changeMatchReducer(state=initialState, action) {
  switch (action.type) {
    case 'data/matchCreate' : {
      return {
        ...state,
        createMatch: action.payload
      }
    }
    case 'data/matchEdit': {
      return {
        ...state,
        editMatch: action.payload
      };
    }
    case 'data/matchReport': {
      return {
        ...state,
        reportMatch: action.payload
      };
    }
    default:
      return state
  }
}


export function createMatch(tournamentID, challenger, defender, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['defender'] = defender;
  body['challenger'] = challenger;
  return async function createMatchThunk(dispatch) {
    const response = await client.post('/tournament/create_challenge', body, challenger, token);
    dispatch({ type: 'data/matchCreate', payload: response });
  };
}

export function editMatch(tournamentID, matchID, date, time, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['match_id'] = matchID;
  body['date'] = date;
  body['time'] = time;
  return async function editMatchThunk(dispatch) {
    const response = await client.put('/tournament/edit_match', body, email, token);
    dispatch({ type: 'data/matchEdit', payload: response });
  };
}

export function reportMatch(tournamentID, matchID, date, time, scoreChallenger, scoreDefender, email, token) {
  const body = {};
  body['tournament_id'] = tournamentID;
  body['match_id'] = matchID;
  body['date'] = date;
  body['time'] = time;
  body['score_challenger'] = scoreChallenger;
  body['score_defender'] = scoreDefender;

  return async function reportMatchThunk(dispatch) {
    const response = await client.put('/tournament/report_match', body, email, token);
    dispatch({ type: 'data/matchReport', payload: response });
  };
}
