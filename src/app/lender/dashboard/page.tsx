'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, CheckCircle, AlertTriangle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getLenderData, LenderData } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

export default function LenderDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [lenderData, setLenderData] = useState<LenderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLenderData = async () => {
      if (!authLoading && !user) {
        router.push('/auth/login-flow');
        return;
      }

      if (user) {
        try {
          const data = await getLenderData(user.uid);
          setLenderData(data);
        } catch (error) {
          console.error("Error fetching lender data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLenderData();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Empty state for new lenders
  if (!lenderData || !lenderData.institutionInfo) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome to QuickScore Lender Portal</h1>
              <p className="text-slate-600 mt-1">Complete your institution profile to get started</p>
            </div>
          </div>

          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="w-16 h-16 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Institution Data</h3>
              <p className="text-slate-600 mb-6 max-w-md">
                You haven't completed your institution profile yet. Complete your profile to start reviewing loan applications and managing your lending portfolio.
              </p>
              <Button size="lg">
                Complete Institution Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const metrics = lenderData.metrics || {
    totalApplications: 0,
    autoApproved: 0,
    flagged: 0,
    rejected: 0,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Lender Dashboard</h1>
              <p className="text-sm text-muted-foreground">{lenderData.institutionInfo?.name || 'Institution Portal'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
            <CardDescription>Recent loan applications awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.totalApplications === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Applications Yet</h3>
                <p className="text-slate-600 max-w-md">
                  You haven't received any loan applications yet. Applications will appear here when borrowers submit their requests.
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Application list will be displayed here</p>
                <p className="text-sm mt-2">Feature coming soon</p>
              </div>
            )}
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
                <p className="font-semibold">{lenderData.institutionInfo?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{lenderData.institutionInfo?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{lenderData.institutionInfo?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="font-semibold">{lenderData.institutionInfo?.registrationNumber || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
