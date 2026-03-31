import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/services/auth";
import { authApi } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Home, Settings, Users, Stethoscope, Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { getDashboardRoute, getRoleName } from "@/utils/roleUtils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user } = useSelector(state => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await logoutUser().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully!", { id: toastId });
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error?.data?.error || "Logout failed", { id: toastId });
      console.error("Logout error:", error);
    }
  };

  const navigationItems = {
    admin: [
      { label: "Dashboard", icon: Home, onClick: () => navigate("/admin") },
      { label: "Users", icon: Users, onClick: () => navigate("/admin") },
      { label: "Settings", icon: Settings, onClick: () => navigate("/admin") },
    ],
    patient: [
      { label: "Dashboard", icon: Home, onClick: () => navigate("/patient") },
      { label: "Appointments", icon: Stethoscope, onClick: () => navigate("/patient") },
    ],
    receptionist: [
      { label: "Dashboard", icon: Home, onClick: () => navigate("/receptionist") },
      { label: "Patients", icon: Users, onClick: () => navigate("/receptionist") },
    ],
  };

  const currentNavItems = user ? navigationItems[user.role] || [] : [];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(user ? getDashboardRoute(user.role) : "/home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-gray-900">MediCare</span>
              <span className="text-xs text-blue-600 font-medium">Healthcare</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user && currentNavItems.length > 0 && (
              <div className="flex items-center gap-4">
                {currentNavItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                    <span className="text-xs text-blue-600 font-medium capitalize">{getRoleName(user?.role)}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-blue-100 rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-blue-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{getRoleName(user?.role)}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          navigate(getDashboardRoute(user?.role));
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors flex items-center gap-2"
                      >
                        <Home className="w-4 h-4" />
                        Go to Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-2 disabled:opacity-60"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        {isLoading ? "Signing out..." : "Sign Out"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")} className="border-blue-200 text-blue-600">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-blue-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-blue-100 pt-4">
            {user && currentNavItems.length > 0 && (
              <div className="space-y-2">
                {currentNavItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-blue-100 my-3"></div>
              </div>
            )}

            {user ? (
              <>
                <div className="px-4 py-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-blue-600 capitalize font-medium">{getRoleName(user?.role)}</p>
                </div>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isLoading}
                  className="w-full gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                  {isLoading ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full border-blue-200 text-blue-600"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
