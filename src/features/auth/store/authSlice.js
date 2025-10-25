import {createSlice} from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("accessToken") ?? null;
const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user: userFromStorage,
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        loadUserFromStorage: (state) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            }
        }
    }
});

export const {setCredentials, loadUserFromStorage, logout} = authSlice.actions;
export default authSlice.reducer;
