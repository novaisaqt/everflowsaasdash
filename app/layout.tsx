import "../styles/globals.css"

export const metadata = {
  title: "Everflow AI",
  description: "Recruitment OS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
