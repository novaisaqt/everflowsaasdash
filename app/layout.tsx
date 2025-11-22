// src/app/layout.tsx
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Everflow Recruitment SaaS',
  description: 'Multi-tenant recruitment CRM and automations'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-neutral-950 text-neutral-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
