import "./globals.css"

export const metadata = {
  title: "Everflow Recruitment Dashboard",
  description: "AI Recruitment SaaS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-white">{children}</body>
    </html>
  )
}
