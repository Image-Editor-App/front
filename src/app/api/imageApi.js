import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/image",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
    responseHandler: async (response) => response.blob(),
});

export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery,
    endpoints: (builder) => ({
        removeBackground: builder.mutation({
            query: (formData) => ({
                url: "/remove-background",
                method: "POST",
                body: formData,
            }),
            transformResponse: (blob) => URL.createObjectURL(blob),
        }),
        enhanceImage: builder.mutation({
            query: ({formData, enhancements}) => ({
                url: "/enhance",
                method: "POST",
                body: formData,
                params: enhancements,
            }),
            transformResponse: (blob) => {
                return URL.createObjectURL(blob);
            },
        }),
    }),
});

export const {
    useRemoveBackgroundMutation,
    useEnhanceImageMutation,
} = imageApi;
