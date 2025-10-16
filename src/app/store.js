import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi.js";
import authReducer from "../features/auth/authSlice.js"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
});
