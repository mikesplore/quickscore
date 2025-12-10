'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BusinessDocumentsPage() {
  const [documents, setDocuments] = useState({
    registrationCert: false,
    taxId: false,
    addressProof: false,
  });

  const handleDocumentUpload = (docType: keyof typeof documents) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: true
    }));
  };

  const canContinue = documents.registrationCert && documents.taxId;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Step 2: Verify Your Business</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Upload official documents to verify your business
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              🔒 Your documents are secure and will only be reviewed by our compliance team. We use them for verification purposes only.
            </AlertDescription>
          </Alert>

          {/* Business Registration Certificate */}
          <div className="border-2 border-dashed rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Business Registration Certificate *</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Official certificate from the business registry (CAK/ACRA)
                </p>
              </div>
              {documents.registrationCert && (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              )}
            </div>

            {!documents.registrationCert ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded border border-gray-200 p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG • Max 10MB</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleDocumentUpload('registrationCert')}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Registration Certificate
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 rounded p-4 text-center">
                <p className="text-green-700 font-medium">✓ Registration certificate uploaded</p>
                <p className="text-xs text-green-600 mt-1">Status: Pending verification</p>
              </div>
            )}

            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium">What information we extract:</summary>
              <ul className="mt-2 space-y-1 ml-4">
                <li>✓ Business registration number</li>
                <li>✓ Date of incorporation</li>
                <li>✓ Business name & address</li>
                <li>✓ Business structure (Ltd, Partnership, etc.)</li>
              </ul>
            </details>
          </div>

          {/* Tax ID / PIN Certificate */}
          <div className="border-2 border-dashed rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Tax ID / PIN Certificate *</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Proof your business is registered for taxes (PIN certificate)
                </p>
              </div>
              {documents.taxId && (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              )}
            </div>

            {!documents.taxId ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded border border-gray-200 p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG • Max 10MB</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleDocumentUpload('taxId')}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Tax ID / PIN Certificate
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 rounded p-4 text-center">
                <p className="text-green-700 font-medium">✓ Tax ID / PIN certificate uploaded</p>
                <p className="text-xs text-green-600 mt-1">Status: Pending verification</p>
              </div>
            )}

            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium">Why we need this:</summary>
              <ul className="mt-2 space-y-1 ml-4">
                <li>✓ Verify business legitimacy</li>
                <li>✓ Confirm tax compliance status</li>
                <li>✓ Cross-check with registration number</li>
              </ul>
            </details>
          </div>

          {/* Proof of Address (Optional) */}
          <div className="border-2 border-dashed rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Proof of Address <span className="text-muted-foreground">(Optional but recommended)</span></h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Utility bill, lease agreement, or property deed
                </p>
              </div>
              {documents.addressProof && (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              )}
            </div>

            {!documents.addressProof ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded border border-gray-200 p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG • Max 10MB</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleDocumentUpload('addressProof')}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Address Proof (Optional)
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 rounded p-4 text-center">
                <p className="text-green-700 font-medium">✓ Address proof uploaded</p>
              </div>
            )}

            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium">Why it helps:</summary>
              <ul className="mt-2 space-y-1 ml-4">
                <li>✓ Confirms business location</li>
                <li>✓ Strengthens your application</li>
                <li>✓ May speed up approval</li>
              </ul>
            </details>
          </div>

          {/* Timeline */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Our compliance team will review your documents within <strong>24-48 hours</strong>. You'll receive an email update on the status.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/borrower/onboard/business/info">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild size="lg" disabled={!canContinue} className="group">
          <Link href="/borrower/onboard/business/representative">
            Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
