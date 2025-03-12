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
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/users/admin-delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["all-User"]
        }),

        userStatusUpdate: build.mutation({
            query: ({ id, status }) => {
                return {
                    url: `/users/update-status/${id}`,
                    method: "PUT",
                    body: {status}

                }
            },
            invalidatesTags: ["allUsers"]
        })
    }),
})


export const { useLoginUserMutation, useAllUsersQuery, useUserStatusUpdateMutation, useSingleUserQuery, useRegisterUserMutation, useAllADMINQuery, useDeleteUserMutation } = userApi