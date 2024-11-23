import { createSlice } from "@reduxjs/toolkit";
let previousMode = localStorage.getItem("isDarkMode")

export const lightBackGround = "bg-gray-100";
export const darkBackGround = "bg-slate-950";
export const lightModeText = "text-gray-900";
export const darkModeText = "text-white";

const initialState = {
    isDarkMode: (previousMode === "true") || false,
    backgroundColor: previousMode === "true" ? darkBackGround : lightBackGround,
    textColor: previousMode === "true" ? darkModeText : lightModeText
};
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, actions) => {
            state.isDarkMode = actions.payload
            localStorage.setItem("isDarkMode", state.isDarkMode)
            if (state.isDarkMode) {
                state.backgroundColor = darkBackGround;
                state.textColor = darkModeText;
            }
            else {
                state.backgroundColor = lightBackGround;
                state.textColor = lightModeText;
            }
        }
    },
});
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;