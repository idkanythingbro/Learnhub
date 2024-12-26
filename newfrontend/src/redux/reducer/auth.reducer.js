import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            state.user = action.payload;
            // console.log(action.payload);
            
        }
    }
})
export const { setLoginUser } = userSlice.actions;
export default userSlice.reducer