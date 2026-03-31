import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { getDashboardRoute } from "@/utils/roleUtils";
import { useSelector } from "react-redux";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth || {});

  const handleGoHome = () => {
    if (user) {
      navigate(getDashboardRoute(user.role), { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-md mx-auto px-6 py-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Your current role doesn't grant access to this resource. Please contact an administrator if you believe this is an error.
        </p>

        <Button
          onClick={handleGoHome}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full"
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-4 w-full border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          Return to Login
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
