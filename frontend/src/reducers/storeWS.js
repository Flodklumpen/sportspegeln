import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentWebsocket: ''
};

export const storeWebsocketSlice = createSlice({
	name: "websocket",
	initialState,
	reducers: {
		updateWS: (state, ws) => {
			state.currentWebsocket = ws.payload;
		}
	}
});

export const { updateWS } = storeWebsocketSlice.actions;

export default storeWebsocketSlice.reducer;
