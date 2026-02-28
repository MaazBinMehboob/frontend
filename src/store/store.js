import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { patientApi } from "../services/patient";
import { appointmentApi } from "../services/appointment";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(patientApi.middleware)
      .concat(appointmentApi.middleware),
});