'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'overview' },
  { href: '/dashboard/pages', label: 'pages' },
  { href: '/dashboard/referrers', label: 'referrers' },
  { href: '/dashboard/devices', label: 'devices' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? 'text-primary py-1' : 'text-muted py-1 hover:text-foreground'}
          >
            &gt; {link.label}
          </Link>
        );
      })}
    </nav>
  );
}