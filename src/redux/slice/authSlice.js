import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
        state.isLoggedIn = true;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.userName = action.payload.userName;
    },

    ///// functiongula ei system a dilew hoy
    REMOVE_ACTIVE_USER(state) {
        state.isLoggedIn = false;
        state.email = null;
        state.userID = null;
        state.userName = null;
    }
  }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;