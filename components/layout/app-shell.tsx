// src/components/layout/app-shell.tsx
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ReactNode } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <SignedIn>
      <div className="min-h-screen flex bg-neutral-950 text-neutral-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
            {children}
          </main>
        </div>
      </div>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  );
}
