import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Routes
import ProtectedRoute from "@/components/routes/ProtectedRoutes";
import PublicRoute from "@/components/routes/PublicRoutes";

// UI
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Directly load receptionist dashboard as protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional login/signup */}
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-center" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;