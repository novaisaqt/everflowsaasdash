// src/app/page.tsx
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SignedIn>
        <div className="flex flex-col items-center gap-6">
          <UserButton />
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Recruitment OS
          </h1>
          <p className="text-neutral-300 max-w-xl text-center">
            Centralise candidates, clients, pipelines and automations in one SaaS.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium"
          >
            Go to dashboard
          </Link>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Everflow Recruitment SaaS
          </h1>
          <p className="text-neutral-300 max-w-xl text-center">
            Turn messy CVs, job boards and spreadsheets into one clear pipeline.
          </p>
          <div className="flex gap-4">
            <Link
              href="/sign-up"
              className="px-6 py-3 rounded-xl bg-white text-black font-medium"
            >
              Get started
            </Link>
            <Link
              href="/sign-in"
              className="px-6 py-3 rounded-xl border border-neutral-600 text-neutral-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
