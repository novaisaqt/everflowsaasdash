import type { Metadata } from "next"
import AppShell from "../components/layout/app-shell";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Everflow SaaS",
  description: "Recruitment dashboard",
}

export default function RootLayout({ children }) {
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
