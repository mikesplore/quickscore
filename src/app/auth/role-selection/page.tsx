'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { Users, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // This page should ONLY be shown during sign-up, not login
  // When user selects a role, it should be saved to their profile

  const roles = [
    {
      id: 'individual',
      title: 'Personal Borrower',
      icon: Users,
      description: 'Looking for a personal loan? Get a decision based on your financial activity.',
      benefits: ['Fast approval', '2-3 minutes to complete', 'No collateral needed'],
      href: '/borrower/onboard/individual/identity',
      color: 'text-blue-500',
    },
    {
      id: 'business',
      title: 'Business Borrower',
      icon: Building2,
      description: 'Grow your business with a loan tailored to your revenue.',
      benefits: ['Flexible terms', '5-7 minutes to complete', 'Based on business revenue'],
      href: '/borrower/onboard/business/info',
      color: 'text-green-500',
    },
    {
      id: 'lender',
      title: 'Lender',
      icon: DollarSign,
      description: 'Fund loans and earn competitive returns.',
      benefits: ['Start investing', '10-15 minutes to set up', 'Automated verification'],
      href: '/lender/onboard/info',
      color: 'text-purple-500',
    },
  ];

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>One-time setup:</strong> Choose your account type. This will determine which features you have access to.
            </AlertDescription>
          </Alert>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3">Who are you?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We'll tailor your experience to match your needs. Select your role to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className={`h-12 w-12 mx-auto mb-3 ${role.color}`}>
                      <IconComponent className="h-full w-full" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-bold mt-0.5">✓</span>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full"
                      variant={isSelected ? 'default' : 'outline'}
                    >
                      <Link href={role.href}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className="underline hover:text-primary font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground border-t">
        <p>LenderVision &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
