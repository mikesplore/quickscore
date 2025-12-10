'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LenderCertificatePage() {
  const [certificateUploaded, setCertificateUploaded] = useState(false);

  const handleUpload = () => {
    setCertificateUploaded(true);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Step 2: Licensing Certificate</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Upload your certificate of lending authorization
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              We need to verify you're authorized to provide lending services.
            </AlertDescription>
          </Alert>

          {/* Certificate Upload */}
          <div className="border-2 border-dashed rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Certificate of Lending/Operations *</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Government-issued license authorizing you to provide lending services
                </p>
                <ul className="text-xs text-muted-foreground mt-3 space-y-1">
                  <li>• Microfinance Institution License</li>
                  <li>• Banking License (Central Bank)</li>
                  <li>• Digital Lender Certificate</li>
                  <li>• Non-Bank Financial Institution License</li>
                </ul>
              </div>
              {certificateUploaded && (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              )}
            </div>

            {!certificateUploaded ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded border border-gray-200 p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG • Max 15MB</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleUpload}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Certificate
                </Button>
                <p className="text-xs text-muted-foreground">
                  You can upload multiple certificates if you have different licenses
                </p>
              </div>
            ) : (
              <div className="bg-green-50 rounded p-4 text-center">
                <p className="text-green-700 font-medium">✓ Certificate uploaded successfully</p>
                <p className="text-xs text-green-600 mt-1">Status: Pending verification</p>
              </div>
            )}
          </div>

          {/* Verification Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 space-y-3">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">What we'll verify:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ License/Certificate Number</li>
                  <li>✓ Issue Date & Expiry Date</li>
                  <li>✓ Issuing Authority</li>
                  <li>✓ Authorized Lending Amount Range</li>
                </ul>
              </div>
              <div className="border-t border-blue-200 pt-3">
                <p className="text-sm text-blue-900">
                  <strong>Timeline:</strong> Compliance review typically takes <strong>2-5 business days</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              After we verify your certificate, we'll ask you to set up your admin account and configure your loan products.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/lender/onboard/info">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" disabled={!certificateUploaded} className="group">
          <Link href="/lender/onboard/admin">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
