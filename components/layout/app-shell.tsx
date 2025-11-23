// components/layout/app-shell.tsx

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
