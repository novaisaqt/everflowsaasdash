import "@/styles/globals.css"
import AppShell from "@/components/layout/app-shell"

export const metadata = {
  title: "Everflow Dashboard",
  description: "AI-powered recruitment SaaS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
