import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://backend-production-bdcd.up.railway.app/auth",
        credentials: 'include'
    }),
    endpoints: (build) => ({

        me: build.query({
            query: () => ("/me")
        }),

        loginUser: build.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),

        signUpUser: build.mutation({
            query: (newUser) => ({
                url: '/signup',
                method: 'POST',
                body: newUser
            })
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
    })
})

export const { useLoginUserMutation, useSignUpUserMutation, useLogoutUserMutation, useMeQuery } = authApi