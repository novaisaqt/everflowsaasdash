import type { Metadata } from "next"
import "@/styles/globals.css"
import AppShell from "@/components/layout/app-shell"

export const metadata: Metadata = {
  title: "Everflow SaaS",
  description: "Recruitment dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
