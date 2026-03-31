import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, Loader2, Heart, Stethoscope } from "lucide-react";

// 1. IMPORTANT: Ensure this path is correct for your project
import { useLoginUserMutation } from "../services/auth"; 
import { loginSchema } from "../schema/auth";
import { getDashboardRoute } from "@/utils/roleUtils";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  
  // 2. Mutation Hook
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Verifying credentials...");

    try {
      const response = await loginUser(data).unwrap();
      const userRole = response?.user?.role;
      
      toast.success("Welcome back!", {
        id: toastId,
        description: `Logged in as ${response?.user?.name}`,
      });

      // Redirect to appropriate dashboard based on user role
      const dashboardRoute = getDashboardRoute(userRole);
      navigate(dashboardRoute, { replace: true });
    } catch (err) {
      toast.error("Login Failed", {
        id: toastId,
        description: err?.data?.error || "Invalid email or password.",
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Medical Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-300 flex items-center justify-center shadow-lg">
              <Heart className="text-blue-900 h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">MediCare</h1>
          <p className="text-cyan-100 text-lg mb-8">Healthcare Management System</p>
          <div className="space-y-4 text-cyan-100/80 text-sm">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-cyan-300" />
              <span>Comprehensive patient management</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-cyan-300" />
              <span>Secure appointment scheduling</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-cyan-300" />
              <span>HIPAA-compliant data protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center p-6 lg:bg-white">
        <Card className="w-full max-w-md border-blue-100 shadow-xl lg:shadow-none bg-white">
          <CardHeader className="text-center pb-6 border-b border-blue-100">
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Heart className="text-white h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your healthcare dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    placeholder="you@example.com" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500" 
                    {...register("email")} 
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link to="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold gap-2 mt-6"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-medium">New user?</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Link to="/signup">Create Account</Link>
            </Button>

            <p className="text-center text-xs text-gray-500 mt-4">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;