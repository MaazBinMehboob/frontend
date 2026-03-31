import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-production-bdcd.up.railway.app/doctors',
    credentials: 'include', // JWT cookie
  }),
  tagTypes: ['Doctor'],
  endpoints: (build) => ({
    
    // Get all doctors
    getDoctors: build.query({
      query: () => '/all',
      providesTags: ['Doctor'],
    }),

    // Get single doctor
    getDoctorById: build.query({
      query: (id) => `/${id}`,
      providesTags: ['Doctor'],
    }),

    // Add new doctor
    addDoctor: build.mutation({
      query: (newDoctor) => ({
        url: '/add',
        method: 'POST',
        body: newDoctor,
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Update doctor
    updateDoctor: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Doctor'],
    }),
  }),
})

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
} = doctorApi
