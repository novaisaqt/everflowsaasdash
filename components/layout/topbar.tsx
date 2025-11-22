// src/components/layout/topbar.tsx
'use client';

import { UserButton } from '@clerk/nextjs';

export function Topbar() {
  return (
    <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-950/80">
      <div className="text-sm text-neutral-400">
        <span className="font-medium text-neutral-100">Recruitment OS</span>{' '}
        · Multi-tenant SaaS
      </div>
      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
}
