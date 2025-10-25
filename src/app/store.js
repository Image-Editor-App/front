import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi.js";
import {imageApi} from "./api/imageApi.js";
import authReducer from "../features/auth/store/authSlice.js"
import imageReducer from "../features/editor/store/imageSlice.js"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        auth: authReducer,
        image: imageReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(imageApi.middleware)
});
