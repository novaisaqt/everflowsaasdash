import "../globals.css"

export const metadata = {
  title: "Everflow Recruitment Dashboard",
  description: "AI Powered Recruitment SaaS"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
