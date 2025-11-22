import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#0f172a] text-white min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
