'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BusinessRepresentativePage() {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    relationship: 'owner',
    personalIdNumber: '12345678',
    email: 'jane@example.com',
    phone: '+254712345678',
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
          <CardTitle className="text-2xl">Step 3: Authorized Representative</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Who is applying for this loan on behalf of the business?
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              We need to verify that you have the authority to represent this business and apply for a loan on its behalf.
            </AlertDescription>
          </Alert>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          {/* Relationship to Business */}
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship to Business *</Label>
            <Select value={formData.relationship} onValueChange={(value) => handleChange('relationship', value)}>
              <SelectTrigger id="relationship">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner (≥51% stake)</SelectItem>
                <SelectItem value="director">Director / Board Member</SelectItem>
                <SelectItem value="manager">Manager / Authorized Signatory</SelectItem>
                <SelectItem value="other">Other (please specify)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Your role in the business determines your authority to borrow on its behalf
            </p>
          </div>

          {/* Personal ID Number */}
          <div className="space-y-2">
            <Label htmlFor="idNumber">Personal ID / Passport Number *</Label>
            <Input
              id="idNumber"
              value={formData.personalIdNumber}
              onChange={(e) => handleChange('personalIdNumber', e.target.value)}
              placeholder="12345678"
            />
            <p className="text-xs text-muted-foreground">
              We'll verify this matches your official ID document
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="jane@example.com"
                />
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
          </div>

          {/* Info Box */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>Next:</strong> We may ask you to verify your personal identity through liveness detection (selfie + ID verification) to confirm you are who you claim to be.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/borrower/onboard/business/documents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" className="group">
          <Link href="/borrower/onboard/business/financials">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
