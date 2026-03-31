import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Heart, Stethoscope } from "lucide-react";
import { signupSchema } from "../schema/auth";

// 1. IMPORT THE HOOK HERE
import { useSignUpUserMutation } from "../services/auth.js"; 

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your profile...");
    
    try {
      await signUpUser(data).unwrap();
      toast.success("Account created successfully!", {
        id: toastId,
        description: "Redirecting to login...",
      });
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Registration Failed", {
        id: toastId,
        description: err?.data?.error || "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Left: Medical Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-300 shadow-lg">
              <Heart className="h-8 w-8 text-blue-900" />
            </div>
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tighter">
            Join <span className="text-cyan-300">MediCare</span>
          </h1>
          <p className="text-lg text-cyan-100/70">
            Create your account to access our comprehensive healthcare management system and streamline patient care.
          </p>
          <div className="space-y-3 pt-8 text-cyan-100/80 text-sm">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-cyan-300" />
              <span>Manage patients efficiently</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-cyan-300" />
              <span>Schedule appointments securely</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-cyan-300" />
              <span>Protected healthcare data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Signup Form Panel */}
      <div className="flex items-center justify-center p-6 lg:bg-white">
        <Card className="w-full max-w-md border-blue-100 shadow-xl lg:shadow-none bg-white">
          <CardHeader className="space-y-1 text-center pb-6 border-b border-blue-100">
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Heart className="text-white h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">Create Account</CardTitle>
            <CardDescription>Register to get started with MediCare</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    placeholder="John Doe" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500" 
                    {...register("name")} 
                  />
                </div>
                {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    type="email"
                    placeholder="name@example.com" 
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500" 
                    {...register("email")} 
                  />
                </div>
                {errors.email && <p className="text-xs font-medium text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
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
                {errors.password && <p className="text-xs font-medium text-red-500">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold gap-2 mt-6 transition-all active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Legal</span>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 leading-relaxed px-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline text-blue-600 hover:text-blue-700">Terms</a> and{" "}
              <a href="#" className="underline text-blue-600 hover:text-blue-700">Privacy Policy</a>.
            </p>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;