// app/layout.tsx

import "../styles/globals.css";

export const metadata = {
  title: "Everflow SaaS",
  description: "Recruitment Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
