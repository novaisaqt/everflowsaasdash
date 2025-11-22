import "./globals.css";

export const metadata = {
  title: "Everflow Hire – 5-Minute AI Hiring Dashboard",
  description: "AI-powered hiring system for recruiters & hiring managers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">{children}</body>
    </html>
  );
}
