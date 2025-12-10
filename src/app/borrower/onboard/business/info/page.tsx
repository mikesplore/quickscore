'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BusinessInfoPage() {
  const [formData, setFormData] = useState({
    businessName: 'Tech Solutions Kenya Ltd',
    registrationNumber: 'BRN/2020/45678',
    dateOfIncorporation: '2020-03-15',
    businessType: 'limited-liability',
    industry: 'services',
    businessAddress: '123 Business Park, Nairobi',
    website: 'www.techsolutions.co.ke',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const yearsInOperation = formData.dateOfIncorporation 
    ? Math.floor((new Date().getTime() - new Date(formData.dateOfIncorporation).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Step 1: About Your Business</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            We'll collect key information about your business to verify it and assess its financial health.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              We'll use this information to cross-check with government registries and verify your business is legitimate.
            </AlertDescription>
          </Alert>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name (Legal Name) *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Your business legal name"
            />
            <p className="text-xs text-muted-foreground">Must match your registration certificate</p>
          </div>

          {/* Registration Number */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regNumber">Business Registration Number *</Label>
              <Input
                id="regNumber"
                value={formData.registrationNumber}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
                placeholder="BRN/2020/45678"
              />
              <p className="text-xs text-muted-foreground">From your business certificate</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incorporation">Date of Incorporation *</Label>
              <Input
                id="incorporation"
                type="date"
                value={formData.dateOfIncorporation}
                onChange={(e) => handleChange('dateOfIncorporation', e.target.value)}
              />
              {yearsInOperation > 0 && (
                <p className="text-xs text-muted-foreground">
                  {yearsInOperation} year{yearsInOperation !== 1 ? 's' : ''} in operation
                </p>
              )}
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type *</Label>
            <Select value={formData.businessType} onValueChange={(value) => handleChange('businessType', value)}>
              <SelectTrigger id="businessType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="limited-liability">Limited Liability Company (LLC/Ltd)</SelectItem>
                <SelectItem value="corporation">Corporation (PLC)</SelectItem>
                <SelectItem value="cooperative">Cooperative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry / Sector *</Label>
            <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
              <SelectTrigger id="industry">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail & E-Commerce</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="transportation">Transportation & Logistics</SelectItem>
                <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="technology">Technology & IT</SelectItem>
                <SelectItem value="finance">Finance & Insurance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Business Address (HQ) *</Label>
            <Input
              id="address"
              value={formData.businessAddress}
              onChange={(e) => handleChange('businessAddress', e.target.value)}
              placeholder="123 Business Park, Nairobi"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="www.yourbusiness.com"
            />
            <p className="text-xs text-muted-foreground">Helps us verify your business online</p>
          </div>

          {/* Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-900">
                <strong>Next step:</strong> We'll ask you to upload your business registration certificate, tax ID, and other documents to verify this information.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8">
        <Button asChild size="lg" className="group">
          <Link href="/borrower/onboard/business/documents">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
