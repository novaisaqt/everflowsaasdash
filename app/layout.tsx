import "../styles/globals.css";
import AppShell from "../components/layout/app-shell";

export const metadata = {
  title: "Everflow Dashboard",
  description: "Recruitment SaaS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
