import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-production-bdcd.up.railway.app/appointments',
    credentials: 'include',
  }),
  tagTypes: ['Appointment'],
  endpoints: (build) => ({

    // Book appointment
    bookAppointment: build.mutation({
      query: (data) => ({
        url: '/book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointment'],
    }),

    // Update appointment status
    updateAppointmentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Appointment'],
    }),

    // Get doctor appointments
    getDoctorAppointments: build.query({
      query: (doctorId) => `/doctor/${doctorId}`,
      providesTags: ['Appointment'],
    }),

    // Get patient appointments
    getPatientAppointments: build.query({
      query: (patientId) => `/patient/${patientId}`,
      providesTags: ['Appointment'],
    }),

  }),
})

export const {
  useBookAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useGetDoctorAppointmentsQuery,
  useGetPatientAppointmentsQuery,
} = appointmentApi