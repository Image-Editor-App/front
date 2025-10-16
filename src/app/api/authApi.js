import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout, setCredentials} from "../../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        if (refreshResult.data) {
            api.dispatch(setCredentials({
                token: refreshResult.data.accessToken,
                user: refreshResult.data.user
            }));

            await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}

const createMutation = (url, method = "POST") => {
    return (builder) => {
        return builder.mutation({
            query: (body) => ({
                url,
                method,
                body
            })
        })
    }
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: createMutation("/login")(builder),
        signupUser: createMutation("/signup")(builder),
        logoutUser: createMutation("/logout")(builder)
    })
})

export const {useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation} = authApi;
