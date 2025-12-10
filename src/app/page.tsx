import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 md:p-6">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          Instant Loan Assessment powered by AI.
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Securely connect your financial data and let our intelligent platform build your profile.
          Get a decision in minutes, not days.
        </p>

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">I am a...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Individual Borrower */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <CardTitle>Individual Borrower</CardTitle>
                <CardDescription>Personal loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Apply for a personal loan with your financial information.
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">Start Application</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Business Borrower */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <CardTitle>Business Borrower</CardTitle>
                <CardDescription>Business loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Apply for a business loan with your company information.
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">Start Application</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Lender */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                <CardTitle>Lender</CardTitle>
                <CardDescription>Register as a lender</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our platform as a lender and fund loans.
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>Already have an account?</p>
            <Button asChild variant="outline">
              <Link href="/auth/login">Log In</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>LenderVision &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
