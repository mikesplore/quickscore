'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for lender dashboard
const mockLenderData = {
  institutionInfo: {
    name: 'QuickScore Lending',
    email: 'contact@quickscore.com',
    phone: '+254700123456',
    registrationNumber: 'REG-2024-001',
  },
  metrics: {
    totalApplications: 156,
    autoApproved: 89,
    flagged: 42,
    rejected: 25,
  },
  recentApplications: [
    {
      id: 'APP-2024-156',
      applicantName: 'Jane Wanjiku',
      applicantType: 'Individual',
      amount: 75000,
      creditScore: 82,
      status: 'pending',
      submittedDate: '2024-12-10',
      aiRecommendation: 'Approve',
    },
    {
      id: 'APP-2024-155',
      applicantName: 'Tech Solutions Ltd',
      applicantType: 'Business',
      amount: 500000,
      creditScore: 85,
      status: 'flagged',
      submittedDate: '2024-12-09',
      aiRecommendation: 'Manual Review',
      flagReason: 'High debt-to-income ratio',
    },
    {
      id: 'APP-2024-154',
      applicantName: 'John Kamau',
      applicantType: 'Individual',
      amount: 100000,
      creditScore: 78,
      status: 'approved',
      submittedDate: '2024-12-08',
      aiRecommendation: 'Approve',
    },
    {
      id: 'APP-2024-153',
      applicantName: 'Green Farm Co-op',
      applicantType: 'Business',
      amount: 750000,
      creditScore: 68,
      status: 'flagged',
      submittedDate: '2024-12-08',
      aiRecommendation: 'Manual Review',
      flagReason: 'Inconsistent revenue pattern',
    },
    {
      id: 'APP-2024-152',
      applicantName: 'Mary Akinyi',
      applicantType: 'Individual',
      amount: 50000,
      creditScore: 45,
      status: 'rejected',
      submittedDate: '2024-12-07',
      aiRecommendation: 'Reject',
      rejectionReason: 'Identity verification failed - forged document detected',
    },
  ],
  weeklyStats: [
    { day: 'Mon', applications: 22, approved: 14, flagged: 6, rejected: 2 },
    { day: 'Tue', applications: 28, approved: 18, flagged: 7, rejected: 3 },
    { day: 'Wed', applications: 25, approved: 16, flagged: 6, rejected: 3 },
    { day: 'Thu', applications: 31, approved: 19, flagged: 8, rejected: 4 },
    { day: 'Fri', applications: 35, approved: 22, flagged: 9, rejected: 4 },
  ],
};

export default function LenderDashboard() {
  const { institutionInfo, metrics, recentApplications, weeklyStats } = mockLenderData;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lender Dashboard</h1>
          <p className="text-muted-foreground mt-1">{institutionInfo.name}</p>
        </div>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Auto-Approved</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.autoApproved}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalApplications > 0 
                  ? `${((metrics.autoApproved / metrics.totalApplications) * 100).toFixed(1)}% of total`
                  : '0% of total'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Flagged for Review</CardTitle>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{metrics.flagged}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalApplications > 0 
                  ? `${((metrics.flagged / metrics.totalApplications) * 100).toFixed(1)}% of total`
                  : '0% of total'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
              <XCircle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.rejected}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalApplications > 0 
                  ? `${((metrics.rejected / metrics.totalApplications) * 100).toFixed(1)}% of total`
                  : '0% of total'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
            <CardDescription>Recent loan applications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{app.applicantName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {app.applicantType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.id} • {app.submittedDate}</p>
                    </div>
                    <Badge className={
                      app.status === 'approved' ? 'bg-green-100 text-green-700' :
                      app.status === 'flagged' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold">KES {app.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Credit Score</p>
                      <p className="font-semibold">{app.creditScore}/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">AI Recommendation</p>
                      <p className="font-semibold text-sm">{app.aiRecommendation}</p>
                    </div>
                  </div>

                  {app.flagReason && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                      <p className="text-xs text-yellow-800">
                        <strong>Flag Reason:</strong> {app.flagReason}
                      </p>
                    </div>
                  )}

                  {app.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
                      <p className="text-xs text-red-800">
                        <strong>Rejection Reason:</strong> {app.rejectionReason}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                    {app.status === 'pending' || app.status === 'flagged' ? (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                        <Button size="sm" variant="destructive">Reject</Button>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Stats Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Application Trends</CardTitle>
            <CardDescription>Application outcomes for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="flagged" fill="#f59e0b" name="Flagged" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Institution Info */}
        <Card>
          <CardHeader>
            <CardTitle>Institution Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Institution Name</p>
                <p className="font-semibold">{institutionInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{institutionInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{institutionInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="font-semibold">{institutionInfo.registrationNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
