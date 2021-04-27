import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'home',
};

export const tabSelectSlice = createSlice({
    name: "tabSelect",
    initialState,
    reducers: {
        switchTabHome: (state) => {
            state.value = "home";
            console.log("Redirect to home");
        }
    },
});

export const { switchTabHome } = tabSelectSlice.actions;

export const selectSwitchTab = (state) => state.tabSelect;

export default tabSelectSlice.reducer;
