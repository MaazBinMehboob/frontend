import { Navigate } from "react-router-dom";
import { useMeQuery } from "@/services/auth";

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useMeQuery();

  if (isLoading) return null;

  return data ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;