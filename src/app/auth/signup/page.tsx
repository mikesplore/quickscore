'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'method' | 'otp' | 'password'>('method');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    setLoading(true);
    // TODO: Implement phone OTP send
    console.log('Sending OTP to:', phoneNumber);
    setStep('otp');
    setLoading(false);
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    // TODO: Implement OTP verification
    console.log('Verifying OTP:', otp);
    // IMPORTANT: During SIGN-UP, go to role selection to set user role
    // This role is saved to the user's profile
    window.location.href = '/auth/role-selection';
    setLoading(false);
  };

  const handleEmailSubmit = async () => {
    setLoading(true);
    // TODO: Implement email sign-up
    console.log('Creating account with email:', email);
    // IMPORTANT: During SIGN-UP, go to role selection to set user role
    // This role is saved to the user's profile
    window.location.href = '/auth/role-selection';
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center w-full max-w-md p-4">
        <div className="mb-8">
          <Logo />
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Join thousands getting instant loan decisions</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'method' && (
              <>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Choose your sign-up method</Label>
                    <div className="grid gap-2">
                      <Button
                        variant={signupMethod === 'phone' ? 'default' : 'outline'}
                        onClick={() => setSignupMethod('phone')}
                        className="w-full justify-start"
                      >
                        {signupMethod === 'phone' ? '✓ ' : ''} Phone Number + OTP
                      </Button>
                      <Button
                        variant={signupMethod === 'email' ? 'default' : 'outline'}
                        onClick={() => setSignupMethod('email')}
                        className="w-full justify-start"
                      >
                        {signupMethod === 'email' ? '✓ ' : ''} Email + Password
                      </Button>
                    </div>
                  </div>
                </div>

                {signupMethod === 'phone' ? (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your phone number in E.164 format (e.g., +254712345678)
                      </p>
                    </div>
                    <Button
                      onClick={handlePhoneSubmit}
                      disabled={!phoneNumber || loading}
                      className="w-full"
                    >
                      {loading ? 'Sending...' : 'Send OTP'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm">Confirm Password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleEmailSubmit}
                      disabled={!email || !password || password !== confirmPassword || loading}
                      className="w-full"
                    >
                      {loading ? 'Creating...' : 'Create Account'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="underline hover:text-primary">
                    Sign In
                  </Link>
                </div>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit code to <strong>{phoneNumber}</strong>
                  </p>
                  <div className="grid gap-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>
                  <Button
                    onClick={handleOtpVerify}
                    disabled={otp.length !== 6 || loading}
                    className="w-full"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep('method')}
                  >
                    Change Number
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Didn't receive the code?{' '}
                  <Button variant="link" className="p-0 h-auto" disabled={loading}>
                    Resend OTP
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{' '}
          <Link href="#" className="underline hover:text-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
