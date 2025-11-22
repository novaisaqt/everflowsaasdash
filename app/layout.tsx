import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Everflow Hire",
  description: "5-minute AI hiring system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#020617] text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
