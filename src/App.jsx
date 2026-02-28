import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import PatientDashboard from "./pages/PatientDashboard";

// Routes
import ProtectedRoute from "@/components/routes/ProtectedRoutes";
import PublicRoute from "@/components/routes/PublicRoutes";

// UI
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
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

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Role-based nested routes */}
          <Route path="receptionist" element={<ReceptionistDashboard />} />
          {/* <Route path="admin" element={<AdminDashboard />} /> */}
          {/* <Route path="doctor" element={<DoctorDashboard />} /> */}
          {/* <Route path="patient" element={<PatientDashboard />} /> */}
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-center" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;