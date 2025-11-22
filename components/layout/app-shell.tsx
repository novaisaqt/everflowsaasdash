'use client'

import { ReactNode } from 'react'
import { SignedIn } from '@clerk/nextjs'
import Sidebar from '@/components/layout/sidebar'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <SignedIn>
      <div className="min-h-screen flex bg-neutral-950 text-neutral-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </SignedIn>
  )
}
