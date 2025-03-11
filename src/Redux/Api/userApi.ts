import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["logIn"]
        }),
        registerUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/users/register",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["all-User"]
        }),

        allADMIN: build.query({
            query: () => ({
                url: `/users/admin`,
                method: "GET"
            }),
            providesTags: ["all-User"]
        }),
        allUsers: build.query({
            query: ({ page, limit, email, role }) => ({
                url: `/users/${role}?page=${page}&limit=${limit}&search=${email}`,
                method: "GET"
            }),
            providesTags: ["allUsers"]
        }),
        singleUser: build.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["allUsers"]
        }),
    
        userStatusUpdate: build.mutation({
            query: (data) => {
                return {
                    url: `/user/toggle-user_status/${data?.id}`,
                    method: "PUT",
                }
            },
            invalidatesTags: ["allUsers"]
        })
    }),
})


export const { useLoginUserMutation, useAllUsersQuery, useUserStatusUpdateMutation, useSingleUserQuery, useRegisterUserMutation, useAllADMINQuery } = userApi