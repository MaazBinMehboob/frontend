import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useMeQuery } from "@/services/auth";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;