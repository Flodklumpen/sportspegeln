import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'home'
};

export const tabSelectSlice = createSlice({
    name: "tabSelect",
    initialState,
    reducers: {
        switchTabHome: (state) => {
            state.value = "home";
            console.log("Redirect to home");
        },
        switchTabProfile: (state) => {
            state.value = "profile";
            console.log("Redirect to profile");
        },
        switchTabLogOut: (state) => {
            state.value = "log-out";
            console.log("Redirect to log out");
        }
    },
});

export const { switchTabHome, switchTabProfile, switchTabLogOut } = tabSelectSlice.actions;

export const selectSwitchTab = (state) => state.tabSelect.value;

export default tabSelectSlice.reducer;
