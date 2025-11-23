export const metadata = {
  title: "Everflow",
  description: "Recruitment SaaS"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
