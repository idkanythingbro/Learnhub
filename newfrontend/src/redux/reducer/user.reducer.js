import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";
const initialState = {
    user: null,
    profile: null,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            state.user = action.payload;
            // console.log(action.payload);
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        }

    }
})
export const { setLoginUser,setProfile } = userSlice.actions;
export default userSlice.reducer