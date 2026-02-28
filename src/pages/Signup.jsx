import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
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
    // The "Professional" Promise Toast
    toast.promise(signUpUser(data).unwrap(), {
      loading: "Creating your profile...",
      success: () => {
        navigate("/login");
        return "Account created! You can now log in.";
      },
      error: (err) => err?.data?.error || "Registration failed. Please try again.",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Marketing / Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-emerald-950 p-12 text-white relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/50">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tighter">
            Join the elite <span className="text-emerald-400">community.</span>
          </h1>
          <p className="text-lg text-emerald-100/70">
            Get started today with a free account and experience the future of workflow management.
          </p>
        </div>
      </div>

      {/* Right: Signup Form Panel */}
      <div className="flex items-center justify-center p-6 bg-zinc-50/50">
        <Card className="w-full max-w-md border-none shadow-xl lg:shadow-none bg-white">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
            <CardDescription>Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input 
                    placeholder="John Doe" 
                    className="pl-10 focus-visible:ring-emerald-500" 
                    {...register("name")} 
                  />
                </div>
                {errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input 
                    type="email"
                    placeholder="name@example.com" 
                    className="pl-10 focus-visible:ring-emerald-500" 
                    {...register("email")} 
                  />
                </div>
                {errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-600 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 focus-visible:ring-emerald-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-medium text-destructive">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10 transition-all active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-zinc-400 font-bold tracking-widest">Legal</span>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 leading-relaxed px-4">
              By clicking create account, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-emerald-600">Terms</Link> and{" "}
              <Link to="/privacy" className="underline hover:text-emerald-600">Privacy Policy</Link>.
            </p>

            <p className="text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
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