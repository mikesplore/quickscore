'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, DollarSign, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for business borrower
const mockBusinessData = {
  businessInfo: {
    name: 'Tech Solutions Kenya Ltd',
    registrationNumber: 'BRN-2020-12345',
    industry: 'Technology',
    email: 'info@techsolutions.ke',
    phone: '+254700987654',
    accountType: 'Business Borrower',
    memberSince: 'January 2024',
  },
  businessScore: 85,
  creditScore: 82,
  employees: 24,
  activeLoans: [
    {
      id: 'BIZ-LOAN-2024-003',
      purpose: 'Equipment Purchase',
      amount: 500000,
      outstanding: 320000,
      interestRate: 14.5,
      term: 24,
      monthlyPayment: 24850,
      paidMonths: 8,
      remainingMonths: 16,
      nextPaymentDate: 'Dec 20, 2024',
    },
  ],
  loanOffers: [
    {
      id: 1,
      amount: 750000,
      interestRate: 13.5,
      term: 18,
      monthlyPayment: 47200,
      purpose: 'Working Capital',
      expiresIn: '10 days',
    },
    {
      id: 2,
      amount: 1200000,
      interestRate: 15,
      term: 36,
      monthlyPayment: 41600,
      purpose: 'Business Expansion',
      expiresIn: '10 days',
    },
  ],
  financialSummary: {
    monthlyRevenue: 850000,
    monthlyExpenses: 620000,
    netProfit: 230000,
    profitMargin: 27,
  },
  revenueHistory: [
    { month: 'Aug', revenue: 780000, expenses: 580000 },
    { month: 'Sep', revenue: 820000, expenses: 600000 },
    { month: 'Oct', revenue: 850000, expenses: 620000 },
    { month: 'Nov', revenue: 850000, expenses: 620000 },
  ],
  paymentHistory: [
    { month: 'Nov', paid: 24850, status: 'on-time' },
    { month: 'Oct', paid: 24850, status: 'on-time' },
    { month: 'Sep', paid: 24850, status: 'on-time' },
    { month: 'Aug', paid: 24850, status: 'on-time' },
  ],
  transactions: [
    { date: '2024-12-08', type: 'Payment Received', amount: 150000, balance: 450000 },
    { date: '2024-12-05', type: 'Supplier Payment', amount: -85000, balance: 300000 },
    { date: '2024-12-01', type: 'Loan Payment', amount: -24850, balance: 385000 },
    { date: '2024-11-28', type: 'Revenue', amount: 200000, balance: 410000 },
  ],
};

export default function BusinessBorrowerDashboard() {
  const { businessInfo, businessScore, creditScore, employees, activeLoans, loanOffers, financialSummary, revenueHistory, paymentHistory, transactions } = mockBusinessData;
  const activeLoan = activeLoans[0];
  const paidPercentage = activeLoan ? ((activeLoan.paidMonths / activeLoan.term) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-muted-foreground mt-1">{businessInfo.name}</p>
        </div>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Business Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{businessScore}</div>
              <p className="text-xs opacity-75 mt-1">Excellent health</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{creditScore}</div>
              <p className="text-xs opacity-75 mt-1">Good standing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {financialSummary.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">↑ Growing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialSummary.profitMargin}%</div>
              <p className="text-xs text-muted-foreground mt-1">KES {financialSummary.netProfit.toLocaleString()}/mo</p>
            </CardContent>
          </Card>
        </div>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>{businessInfo.industry} • {employees} employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="font-semibold">{businessInfo.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="font-semibold">{businessInfo.industry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="font-semibold">{employees}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-semibold">{businessInfo.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Loan */}
        {activeLoan && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Business Loan</CardTitle>
                  <CardDescription>{activeLoan.purpose} - {activeLoan.id}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Original Amount</p>
                  <p className="text-lg font-bold">KES {activeLoan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-lg font-bold text-orange-600">KES {activeLoan.outstanding.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-lg font-bold">KES {activeLoan.monthlyPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="text-lg font-bold">{activeLoan.nextPaymentDate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Loan Progress</span>
                  <span className="font-medium">{activeLoan.paidMonths} of {activeLoan.term} months paid</span>
                </div>
                <Progress value={paidPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground">{activeLoan.remainingMonths} months remaining</p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Make Payment</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Loan Offers */}
          <Card>
            <CardHeader>
              <CardTitle>Available Business Loans</CardTitle>
              <CardDescription>Pre-approved offers for your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loanOffers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-lg">KES {offer.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{offer.purpose}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {offer.expiresIn}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Interest</p>
                      <p className="font-medium">{offer.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Term</p>
                      <p className="font-medium">{offer.term} months</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly</p>
                      <p className="font-medium">KES {offer.monthlyPayment.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">Apply Now</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue vs Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>Last 4 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ec4899" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Business account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((txn, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <DollarSign className={`w-5 h-5 ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{txn.type}</p>
                      <p className="text-sm text-muted-foreground">{txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount > 0 ? '+' : ''}KES {Math.abs(txn.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Bal: KES {txn.balance.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
