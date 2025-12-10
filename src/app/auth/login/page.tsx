'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

export default function AuthLoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // TODO: Implement actual login authentication
    // After authentication, fetch user's role from database
    
    // Mock: Simulate fetching user data with their saved role
    const mockUser = {
      email: 'user@example.com',
      role: 'individual', // This should come from database: 'individual' | 'business' | 'lender'
    };

    // Redirect based on their EXISTING role (already set during signup)
    switch (mockUser.role) {
      case 'individual':
        window.location.href = '/borrower/dashboard';
        break;
      case 'business':
        window.location.href = '/borrower/dashboard'; // or /business/dashboard if separate
        break;
      case 'lender':
        window.location.href = '/lender/dashboard';
        break;
      default:
        // If somehow they don't have a role (shouldn't happen), send to role selection
        window.location.href = '/auth/role-selection';
    }
    
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center w-full max-w-sm p-4">
        <div className="mb-8">
          <Logo />
        </div>
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your LenderVision account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input id="email" type="text" placeholder="m@example.com or +254712345678" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-sm text-center text-muted-foreground space-y-2">
                <p>
                    Don't have an account? <Link href="/auth/signup" className="underline hover:text-primary font-medium">Create one</Link>
                </p>
                <p>
                    <Link href="#" className="underline hover:text-primary">Forgot password?</Link>
                </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
