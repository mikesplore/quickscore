'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LenderAdminPage() {
  const [formData, setFormData] = useState({
    fullName: 'John Smith',
    email: 'john@fastcredit.co.ke',
    phone: '+254712345678',
    jobTitle: 'CEO',
    personalIdNumber: '12345678',
  });

  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Step 3: Admin Account Setup</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Create the Super Admin account for your institution
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Admin Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account Administrator</h3>
            <p className="text-sm text-muted-foreground">
              This person will have full access to your lender dashboard and can invite other team members.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  placeholder="e.g., CEO, Credit Officer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@company.com"
                  className={emailVerified ? 'border-green-500' : ''}
                />
                {emailVerified ? (
                  <Button disabled variant="outline" className="px-4">
                    ✓ Verified
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setEmailVerified(true)}
                    className="px-4"
                  >
                    Verify
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send a verification link to this email
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+254712345678"
              />
            </div>
          </div>

          {/* Identity Verification */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Identity Verification</h3>
            <p className="text-sm text-muted-foreground">
              For compliance, we need to verify your personal identity.
            </p>

            <div className="space-y-2">
              <Label htmlFor="idNumber">Personal ID / Passport Number *</Label>
              <Input
                id="idNumber"
                value={formData.personalIdNumber}
                onChange={(e) => handleChange('personalIdNumber', e.target.value)}
                placeholder="12345678"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
              <p className="font-medium mb-2">Next, you may be asked to:</p>
              <ul className="space-y-1">
                <li>✓ Provide a valid ID document (upload)</li>
                <li>✓ Complete liveness verification (selfie)</li>
                <li>✓ Verify your phone number via OTP</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/lender/onboard/certificate">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" disabled={!emailVerified} className="group">
          <Link href="/lender/onboard/products">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
