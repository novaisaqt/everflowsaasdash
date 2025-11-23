import AppShell from "../../components/layout/app-shell";

export default function ClientsPage() {

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>

        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          Client system is connected and ready ✅
        </div>
      </div>
    </AppShell>
  );
}
