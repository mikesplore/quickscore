'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserCheck, Wallet, FileText, Check } from 'lucide-react';
import Link from 'next/link';

const individualSteps = [
  { name: 'Identity', href: '/borrower/onboard/individual/identity', icon: UserCheck },
  { name: 'Financials', href: '/borrower/onboard/individual/financials', icon: Wallet },
  { name: 'Details', href: '/borrower/onboard/individual/details', icon: FileText },
  { name: 'Assessment', href: '/borrower/onboard/individual/assessment', icon: Check },
];

const businessSteps = [
  { name: 'Business Info', href: '/borrower/onboard/business/info', icon: FileText },
  { name: 'Representative', href: '/borrower/onboard/business/representative', icon: UserCheck },
  { name: 'Financials', href: '/borrower/onboard/business/financials', icon: Wallet },
  { name: 'Documents', href: '/borrower/onboard/business/documents', icon: FileText },
  { name: 'Assessment', href: '/borrower/onboard/business/assessment', icon: Check },
];

export function ApplicationProgress() {
  const pathname = usePathname();
  
  // Determine which step set to use based on current path
  const isBusinessPath = pathname?.includes('/business/');
  const steps = isBusinessPath ? businessSteps : individualSteps;
  
  const currentStepIndex = steps.findIndex(step => pathname === step.href);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="md:flex-1">
            {stepIdx <= currentStepIndex ? (
              <Link
                href={step.href}
                className="group flex flex-col border-l-4 border-primary py-2 pl-4 hover:border-primary-dark md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current={stepIdx === currentStepIndex ? 'step' : undefined}
              >
                <span className="text-sm font-medium text-primary">{step.name}</span>
                <span className="text-sm font-medium text-muted-foreground">Step {stepIdx + 1}</span>
              </Link>
            ) : (
              <div className="group flex flex-col border-l-4 border-border py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-muted-foreground">{step.name}</span>
                <span className="text-sm font-medium text-muted-foreground">Step {stepIdx + 1}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
