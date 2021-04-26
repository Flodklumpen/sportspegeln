import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'home',
    value: 'home'
};

export const tabSelectSlice = createSlice({
    name: "tabSelect",
    initialState,
    reducers: {
        switchTab: (state, action) => {
            if (state.value === "New value") {
                state.value = "Start value";
            } else {
                state.value = "New value";
            }
        },
    },
});

