import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-production-bdcd.up.railway.app/patients',
    credentials: 'include', // JWT cookie
  }),
  tagTypes: ['Patient'],
  endpoints: (build) => ({
    
    // Get all patients
    getPatients: build.query({
      query: () => '/all',
      providesTags: ['Patient'],
    }),

    // Get single patient
    getPatientById: build.query({
      query: (id) => `/${id}`,
      providesTags: ['Patient'],
    }),

    // Add new patient
    addPatient: build.mutation({
      query: (newPatient) => ({
        url: '/add',
        method: 'POST',
        body: newPatient,
      }),
      invalidatesTags: ['Patient'],
    }),

    // Update patient
    updatePatient: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Patient'],
    }),
  }),
})

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
} = patientApi