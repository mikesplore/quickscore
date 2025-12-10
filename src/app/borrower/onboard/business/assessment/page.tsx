'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { CheckCircle, TrendingUp, DollarSign, Percent, Clock, BarChart3 } from 'lucide-react';

export default function BusinessAssessmentPage() {
  // Mock assessment data
  const assessment = {
    businessName: 'Tech Solutions Kenya Ltd',
    businessScore: 68,
    status: 'CONDITIONALLY_APPROVED',
    approvedLoanAmount: { min: 150000, max: 500000 },
    interestRateRange: { min: 14, max: 20 },
    repaymentPeriods: { min: 6, max: 36 },
    keyInsights: [
      'Your business shows consistent monthly revenue patterns over the past 8 months',
      'Average monthly revenue: KES 245,000 - which supports a business credit score of 68/100',
      'Transaction frequency indicates healthy daily operations',
      'Recommended loan amount based on business health: 150,000 - 500,000 KES',
      'Your growing employee base (6-20) suggests business expansion',
      'Condition: Please provide last 3 months of bank statements for final approval',
    ],
    financialMetrics: {
      revenueConsistency: 'Growing',
      monthlyVolatility: 'Low',
      cashInflow: 'Daily',
      riskFactors: ['Seasonal variation expected', 'Industry standard review recommended'],
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'CONDITIONALLY_APPROVED':
        return 'bg-yellow-100 text-yellow-800';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return '✓ Approved';
      case 'CONDITIONALLY_APPROVED':
        return '⚠ Conditionally Approved';
      case 'UNDER_REVIEW':
        return '⏳ Under Review';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Card */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center animate-bounce">
              <CheckCircle className="h-10 w-10 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-yellow-900">Assessment Complete!</h2>
              <p className="text-yellow-700 mt-2">Your business credit assessment is ready</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Business Assessment</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{assessment.businessName}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credit Score */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Business Credit Score</h3>
              <p className="text-sm text-muted-foreground">0-100 scale</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{assessment.businessScore}</p>
              <Progress value={assessment.businessScore} className="w-32 mt-2" />
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* Approval Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Assessment Status</h3>
              <p className="text-sm text-muted-foreground">Your application decision</p>
            </div>
            <Badge className={`text-lg px-4 py-2 ${getStatusColor(assessment.status)}`}>
              {getStatusLabel(assessment.status)}
            </Badge>
          </div>

          <div className="border-t pt-6" />

          {/* Loan Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Approved Amount */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Approved Loan Range</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {assessment.approvedLoanAmount.min.toLocaleString()} - {assessment.approvedLoanAmount.max.toLocaleString()} KES
              </p>
            </div>

            {/* Interest Rate */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-5 w-5 text-purple-600" />
                <p className="text-sm font-medium text-purple-900">Interest Rate</p>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {assessment.interestRateRange.min}% - {assessment.interestRateRange.max}% p.a.
              </p>
            </div>

            {/* Repayment Period */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-900">Repayment Terms</p>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {assessment.repaymentPeriods.min} - {assessment.repaymentPeriods.max} months
              </p>
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* Financial Metrics */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Financial Health Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-muted-foreground font-medium">Revenue Consistency</p>
                <p className="text-lg font-bold mt-1">{assessment.financialMetrics.revenueConsistency}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-muted-foreground font-medium">Volatility</p>
                <p className="text-lg font-bold mt-1">{assessment.financialMetrics.monthlyVolatility}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-muted-foreground font-medium">Cash Inflow</p>
                <p className="text-lg font-bold mt-1">{assessment.financialMetrics.cashInflow}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-muted-foreground font-medium">Risk Level</p>
                <p className="text-lg font-bold mt-1 text-orange-600">Medium</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* Key Insights */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Key Insights from Your Assessment
            </h3>
            <ul className="space-y-3">
              {assessment.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-muted-foreground text-sm">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions (if any) */}
          {assessment.status === 'CONDITIONALLY_APPROVED' && (
            <>
              <div className="border-t pt-6" />
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Conditions for Approval</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>✓ Please provide last 3 months of bank statements for final approval</li>
                  <li>✓ Verification of authorized representative (manual review in progress)</li>
                  <li>✓ Expected completion: Within 24 hours</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Recommended Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your assessment is {assessment.status === 'APPROVED' ? 'complete and approved' : assessment.status === 'CONDITIONALLY_APPROVED' ? 'pending final conditions' : 'under review by our team'}.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/borrower/dashboard">
                View Available Loans
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/borrower/dashboard">
                Go to My Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Confirmation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            📧 <strong>A confirmation email has been sent</strong> to your registered email address with your complete business assessment details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
