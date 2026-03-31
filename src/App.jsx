import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Routes
import ProtectedRoute from "@/components/routes/ProtectedRoutes";
import PublicRoute from "@/components/routes/PublicRoutes";
import RoleBasedRoute from "@/components/routes/RoleBasedRoute";

// UI
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Protected Routes - Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Protected Routes - Patient Dashboard */}
        <Route
          path="/patient"
          element={
            <RoleBasedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Protected Routes - Receptionist Dashboard */}
        <Route
          path="/receptionist"
          element={
            <RoleBasedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Unauthorized Access */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Root → Redirect based on authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/receptionist" replace />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;