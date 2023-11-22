import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const loginSlice = createSlice({
  name: "Email",
  initialState,
  reducers: {
    setEmailData(state, action) {
      state.email = action.payload;
    },
  },
});

export const { setEmailData } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
export default loginSlice;
