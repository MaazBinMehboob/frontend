import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { patientApi } from "../services/patient";
import { appointmentApi } from "../services/appointment";
import { doctorApi } from "../services/doctor";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(patientApi.middleware)
      .concat(appointmentApi.middleware)
      .concat(doctorApi.middleware),
});