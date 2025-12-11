import Link from 'next/link';
import Image from 'next/image';

export function Logo({ inHeader = true }: { inHeader?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 outline-none">
      <Image src="/logo/logo.png" alt="QuickScore" width={48} height={48} className="h-12 w-12" />
      <span className={`text-3xl font-bold ${inHeader ? 'text-foreground' : 'text-sidebar-foreground'}`}>QuickScore</span>
    </Link>
  );
}
