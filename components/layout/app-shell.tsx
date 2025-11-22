// src/components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Pipeline, CreditCard, Globe, Settings } from 'lucide-react';
import clsx from 'clsx';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/pipeline', label: 'Pipeline', icon: Pipeline },
  { href: '/lead-scraper', label: 'Lead scraper', icon: Globe },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-neutral-800 bg-neutral-950/80">
      <div className="h-16 flex items-center px-4 border-b border-neutral-800">
        <span className="text-lg font-semibold">Recruitment OS</span>
      </div>
      <nav className="flex-1 py-4 space-y-1">
        {nav.map(item => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'mx-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm',
                active
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
