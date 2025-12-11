'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Camera, Upload, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

const livenessPrompts = [
  'Please center your face in the frame.',
  'Blink your eyes now.',
  'Turn your head slightly to the left.',
  'Smile for the camera.',
  'Verification in progress...',
];

export default function IndividualIdentityPage() {
  const { toast } = useToast();
  const [promptIndex, setPromptIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [livenessComplete, setLivenessComplete] = useState(false);
  const [idFrontUploaded, setIdFrontUploaded] = useState(false);
  const [idBackUploaded, setIdBackUploaded] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  useEffect(() => {
    if (hasCameraPermission && promptIndex < livenessPrompts.length) {
      const timer = setTimeout(() => {
        setPromptIndex(promptIndex + 1);
        setProgress(((promptIndex + 1) / livenessPrompts.length) * 100);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (hasCameraPermission) {
      setLivenessComplete(true);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [promptIndex, hasCameraPermission]);

  const livenessImage = PlaceHolderImages.find(p => p.id === 'liveness-check');
  const idFrontImage = PlaceHolderImages.find(p => p.id === 'id-card-front');
  const idBackImage = PlaceHolderImages.find(p => p.id === 'id-card-back');

  const canContinue = livenessComplete && idFrontUploaded && idBackUploaded;

  return (
    <div className="space-y-8">
      {/* Liveness Detection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Step 1: Verify Your Identity</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Let's verify you're a real person</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={cn(
              "relative w-64 h-64 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all",
              livenessComplete ? "border-solid border-green-500" : "border-dashed border-primary animate-pulse"
            )}>
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover scale-[1.7]" 
                autoPlay 
                muted 
                playsInline 
              />
              {!livenessComplete && <div className="absolute inset-0 bg-black/30" />}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Liveness Detection</h3>
              <p className="text-muted-foreground mb-4">
                To prevent fraud, we need to verify you're a real person. Follow the on-screen prompts.
              </p>
              <div className="h-16 flex items-center justify-center md:justify-start">
                <p className="text-lg font-medium text-primary">{livenessPrompts[promptIndex]}</p>
              </div>
              <Progress value={progress} className="w-full" />
              {livenessComplete && (
                <p className="text-sm text-green-600 mt-3 font-medium">✓ Liveness verification complete!</p>
              )}
            </div>
          </div>

          {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Camera access is required. Please enable camera permissions in your browser settings and refresh the page.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* ID Upload Card */}
      {livenessComplete && (
        <Card className="animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle>Step 2: Upload Your National ID</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Upload clear photos of both sides of your ID</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                🔒 Your data is encrypted and secure. Only reviewed by our verification team.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Front of ID */}
              <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer">
                <div className="text-center">
                  <h4 className="font-semibold mb-1">Front of ID</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Driver's license, Passport, or National ID
                  </p>
                </div>
                <div className="w-[300px] h-[190px] rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {idFrontUploaded ? (
                    <div className="w-full h-full bg-green-50 flex items-center justify-center">
                      <p className="text-green-600 font-medium">✓ Uploaded</p>
                    </div>
                  ) : idFrontImage ? (
                    <Image 
                      src={idFrontImage.imageUrl}
                      alt={idFrontImage.description}
                      width={300}
                      height={190}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setIdFrontUploaded(true)}
                >
                  <Upload className="mr-2 h-4 w-4" /> 
                  {idFrontUploaded ? 'Re-upload' : 'Upload Front'}
                </Button>
              </div>

              {/* Back of ID */}
              <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer">
                <div className="text-center">
                  <h4 className="font-semibold mb-1">Back of ID</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Include all visible information
                  </p>
                </div>
                <div className="w-[300px] h-[190px] rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {idBackUploaded ? (
                    <div className="w-full h-full bg-green-50 flex items-center justify-center">
                      <p className="text-green-600 font-medium">✓ Uploaded</p>
                    </div>
                  ) : idBackImage ? (
                    <Image 
                      src={idBackImage.imageUrl}
                      alt={idBackImage.description}
                      width={300}
                      height={190}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setIdBackUploaded(true)}
                >
                  <Upload className="mr-2 h-4 w-4" /> 
                  {idBackUploaded ? 'Re-upload' : 'Upload Back'}
                </Button>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Tips for good photos:</strong> Make sure the entire ID is visible, well-lit, and all text is clear. No glare or shadows.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <Button 
          size="lg" 
          disabled={!canContinue}
          className="group"
          onClick={() => {
            sessionStorage.setItem('identityComplete', 'true');
            window.location.href = '/borrower/onboard/individual/details';
          }}
        >
          Next Step <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
