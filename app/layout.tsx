import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everflow Hire",
  description: "5-minute AI hiring dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-950 text-white min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
