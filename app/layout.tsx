import "./globals.css";

export const metadata = {
  title: "Everflow AI Hiring Dashboard",
  description: "5-minute AI hiring system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070b16] text-white">{children}</body>
    </html>
  );
}
