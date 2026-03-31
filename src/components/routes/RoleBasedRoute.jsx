import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useMeQuery } from "@/services/auth";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { data, isLoading, isError } = useMeQuery();
  const { user } = useSelector(state => state.auth || {});

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (isError || !data || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "patient") {
      return <Navigate to="/patient" replace />;
    } else if (user.role === "receptionist") {
      return <Navigate to="/receptionist" replace />;
    }
    // Default fallback
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
