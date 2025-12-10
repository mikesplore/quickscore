'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, AlertCircle, Smartphone, Building, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BusinessFinancialsPage() {
  const [dataSource, setDataSource] = useState<'till' | 'bank' | 'manual' | null>(null);
  const [formData, setFormData] = useState({
    till: '+254712345678',
    bankName: 'KCB',
    accountNumber: '0000000000',
    employeeCount: '6-20',
    monthlyRevenue: '100000-250000',
    loanPurpose: 'working-capital',
    desiredAmount: '250000',
    desiredTerm: '12',
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
          <CardTitle className="text-2xl">Step 4: Business Financial Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Help us understand your business's financial health
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              🔒 Your financial data is encrypted and secure. We use it to generate your business credit assessment.
            </AlertDescription>
          </Alert>

          {/* Data Source Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Where should we get your financial data?</h3>
            <p className="text-sm text-muted-foreground">Choose at least one source</p>

            <Tabs 
              value={dataSource || ''} 
              onValueChange={(val) => setDataSource(val as 'till' | 'bank' | 'manual' | null)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="till" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Till/Paybill</span>
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Bank Account</span>
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
              </TabsList>

              {/* Till/Paybill */}
              <TabsContent value="till">
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <h4 className="font-semibold">Business Till/Paybill Number</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll analyze your M-Pesa business account transactions from the last 6-12 months.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="till">Till/Paybill Number *</Label>
                      <Input
                        id="till"
                        type="tel"
                        value={formData.till}
                        onChange={(e) => handleChange('till', e.target.value)}
                        placeholder="+254712345678 or Till Number"
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                      <p className="font-medium mb-2">We'll analyze:</p>
                      <ul className="space-y-1">
                        <li>✓ Total transaction volume</li>
                        <li>✓ Average daily revenue</li>
                        <li>✓ Payment consistency</li>
                        <li>✓ Customer concentration</li>
                      </ul>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription text-sm>
                        You'll be redirected to authorize this connection. We never see your PIN.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bank Account */}
              <TabsContent value="bank">
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <h4 className="font-semibold">Business Bank Account</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll analyze 6-12 months of bank statements to understand your cash flow.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => handleChange('bankName', e.target.value)}
                        placeholder="e.g., KCB, Equity, I&M Bank"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => handleChange('accountNumber', e.target.value)}
                        placeholder="Your business account number"
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                      <p className="font-medium mb-2">We'll analyze:</p>
                      <ul className="space-y-1">
                        <li>✓ 6-12 months of statements</li>
                        <li>✓ Monthly revenue patterns</li>
                        <li>✓ Expense trends</li>
                        <li>✓ Cash balance health</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Manual Upload */}
              <TabsContent value="manual">
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <h4 className="font-semibold">Upload Bank Statements</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload your bank statements directly. This may extend the approval timeline.
                    </p>
                    <div className="bg-gray-50 rounded border border-gray-200 p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF • Last 6-12 months • Max 20MB</p>
                    </div>
                    <Alert variant="default">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Our team will manually review your statements within 2-3 business days.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Operational Details */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="font-semibold text-lg">Additional Business Information</h3>

            {/* Employee Count */}
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees *</Label>
              <Select value={formData.employeeCount} onValueChange={(value) => handleChange('employeeCount', value)}>
                <SelectTrigger id="employees">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me (Solo)</SelectItem>
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-20">6-20 employees</SelectItem>
                  <SelectItem value="21-50">21-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                  <SelectItem value="100+">100+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Revenue */}
            <div className="space-y-2">
              <Label htmlFor="revenue">Estimated Average Monthly Revenue *</Label>
              <Select value={formData.monthlyRevenue} onValueChange={(value) => handleChange('monthlyRevenue', value)}>
                <SelectTrigger id="revenue">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">Less than 50,000 KES</SelectItem>
                  <SelectItem value="50000-100000">50,000 - 100,000 KES</SelectItem>
                  <SelectItem value="100000-250000">100,000 - 250,000 KES</SelectItem>
                  <SelectItem value="250000-500000">250,000 - 500,000 KES</SelectItem>
                  <SelectItem value="500000-1000000">500,000 - 1,000,000 KES</SelectItem>
                  <SelectItem value="1000000+">1,000,000+ KES</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Will be verified against your financial data
              </p>
            </div>

            {/* Loan Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose">What will you use this loan for? *</Label>
              <Select value={formData.loanPurpose} onValueChange={(value) => handleChange('loanPurpose', value)}>
                <SelectTrigger id="purpose">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expand-operations">Expand operations</SelectItem>
                  <SelectItem value="purchase-equipment">Purchase equipment</SelectItem>
                  <SelectItem value="working-capital">Working capital</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="marketing">Marketing & growth</SelectItem>
                  <SelectItem value="payroll">Payroll & salaries</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loan Amount & Term */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Desired Loan Amount (KES) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.desiredAmount}
                  onChange={(e) => handleChange('desiredAmount', e.target.value)}
                  placeholder="250000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Preferred Repayment Period (Months) *</Label>
                <Input
                  id="term"
                  type="number"
                  value={formData.desiredTerm}
                  onChange={(e) => handleChange('desiredTerm', e.target.value)}
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/borrower/onboard/business/representative">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" disabled={!dataSource} className="group">
          <Link href="/borrower/onboard/business/assessment">
            Complete Assessment <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
