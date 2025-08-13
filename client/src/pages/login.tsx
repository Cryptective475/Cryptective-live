import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { login } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Github, Chrome } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">C</span>
            </div>
            <span className="text-2xl font-bold text-primary">Cryptective</span>
          </div>
          <h2 className="text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <Link href="/signup">
              <span className="font-medium text-primary hover:text-primary/80 cursor-pointer">
                create a new account
              </span>
            </Link>
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">Remember me</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Link href="/forgot-password">
                    <span className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                      Forgot your password?
                    </span>
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 font-semibold"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            {/* Social Login Options */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" disabled>
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" disabled>
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center text-xs text-muted-foreground">
              <p>
                Your account is protected with industry-standard encryption.
              </p>
              <p className="mt-1">
                By signing in, you agree to our{" "}
                <Link href="/terms">
                  <span className="text-primary hover:text-primary/80 cursor-pointer">
                    Terms of Service
                  </span>
                </Link>{" "}
                and{" "}
                <Link href="/privacy">
                  <span className="text-primary hover:text-primary/80 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help accessing your account?{" "}
            <Link href="/contact">
              <span className="font-medium text-primary hover:text-primary/80 cursor-pointer">
                Contact Support
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
