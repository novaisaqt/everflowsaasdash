export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <main className="ml-64">{children}</main>
    </div>
  )
}
