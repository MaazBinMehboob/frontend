import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, Loader2, Github } from "lucide-react";

// 1. IMPORTANT: Ensure this path is correct for your project
import { useLoginUserMutation } from "../services/auth"; 
import { loginSchema } from "../schema/auth";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
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
      await loginUser(data).unwrap();
      
      toast.success("Welcome back!", {
        id: toastId,
        description: "Login successful.",
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error("Login Failed", {
        id: toastId,
        description: err?.data?.error || "Invalid email or password.",
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-900 text-white p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <Lock className="text-white h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Secure Gateway</h1>
          <p className="text-zinc-400 text-lg">Access your professional dashboard and manage your workspace.</p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center p-6 bg-zinc-50/50">
        <Card className="w-full max-w-md border-none shadow-xl lg:shadow-none bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-600" />
                  <Input 
                    placeholder="you@example.com" 
                    className="pl-10" 
                    {...register("email")} 
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <Link to="#" className="text-xs text-blue-600 hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-600" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </form>

            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-zinc-400 text-xs uppercase">Or</span>
                <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full"><Github className="mr-2 h-4 w-4" /> Github</Button>
              <Button variant="outline" className="w-full">Google</Button>
            </div>

            <p className="text-center text-sm text-zinc-500">
              New here? <Link to="/signup" className="text-blue-600 font-semibold">Create account</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;