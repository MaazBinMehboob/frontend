import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMeQuery } from "@/services/auth";
import { getDashboardRoute } from "@/utils/roleUtils";

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useMeQuery();
  const { user } = useSelector(state => state.auth || {});

  if (isLoading) return null;

  // If user is already authenticated, redirect to their dashboard
  if (data && user) {
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  return children;
};

export default PublicRoute;