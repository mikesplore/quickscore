import { Logo } from "@/components/shared/Logo";

export default function LenderOnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 md:p-6 border-b">
        <Logo />
      </header>
      <main className="container mx-auto max-w-4xl py-8 md:py-12 px-4">
        {children}
      </main>
    </div>
  );
}
