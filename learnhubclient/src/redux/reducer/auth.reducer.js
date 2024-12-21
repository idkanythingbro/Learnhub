import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    profile: {
        userName: "",
        avatar: "",
        name: "John Doe",
        organization: "Company",
        email: "",
        phone: "",
        location: "",
        designation: "",
        description: "",
    }
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
export const { setLoginUser, setProfile } = userSlice.actions;
export default userSlice.reducer