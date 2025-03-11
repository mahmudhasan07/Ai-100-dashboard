// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://api.townzz.com/api/v1/', // Replace with your API's base URL
        baseUrl: 'http://10.0.20.36:5011/api/v1', // Replace with your API's base URL
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken") // Assuming token is stored in the auth slice
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["approveEvent", "allEvents", "logIn", "transaction", "allUsers", "all-User", "complains", "updateSubscription"]
});

// Export hooks for usage in functional components
export default baseApi;
