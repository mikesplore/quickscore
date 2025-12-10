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

export default function IndividualDetailsPage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-15',
    email: 'john@example.com',
    phoneNumber: '+254712345678',
    address: '123 Main Street, Nairobi',
    city: 'Nairobi',
    employmentStatus: 'employed',
    employerName: 'Tech Company Ltd',
    monthlyIncomeRange: '50000-100000',
  });

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
          <CardTitle className="text-2xl">Step 2: Your Personal Details</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            We've pre-filled some information from your ID. Please complete the rest.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Name Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Name</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">From your ID</p>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="+254712345678"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Residential Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Nairobi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value="Kenya"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Employment Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Employment Information</h3>
              <div className="space-y-2">
                <Label htmlFor="employment">Employment Status *</Label>
                <Select value={formData.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
                  <SelectTrigger id="employment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.employmentStatus === 'employed' && (
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer Name</Label>
                  <Input
                    id="employer"
                    value={formData.employerName}
                    onChange={(e) => handleChange('employerName', e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
              )}
            </div>

            {/* Income Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Income Information</h3>
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income Range (Optional but recommended)</Label>
                <Select value={formData.monthlyIncomeRange} onValueChange={(value) => handleChange('monthlyIncomeRange', value)}>
                  <SelectTrigger id="income">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">Less than 50,000 KES</SelectItem>
                    <SelectItem value="50000-100000">50,000 - 100,000 KES</SelectItem>
                    <SelectItem value="100000-250000">100,000 - 250,000 KES</SelectItem>
                    <SelectItem value="250000-500000">250,000 - 500,000 KES</SelectItem>
                    <SelectItem value="500000+">500,000+ KES</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This helps us recommend appropriate loan amounts. We'll verify this with your bank data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/borrower/onboard/individual/identity">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" className="group">
          <Link href="/borrower/onboard/individual/financials">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
