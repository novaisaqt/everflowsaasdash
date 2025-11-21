import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Everflow Recruitment Dashboard",
  description: "AI Recruitment SaaS"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
