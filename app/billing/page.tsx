// app/billing/page.tsx

import { supabaseAdmin } from "@/lib/supabase";
import { requireTenant } from "@/lib/requireTenant";

export default async function BillingPage() {
  const tenant = await requireTenant("manager");

  const { data: billing, error } = await supabaseAdmin
    .from("billing_accounts")
    .select("*")
    .eq("tenant_id", tenant.tenantId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not load billing info");
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>

      {billing ? (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(billing, null, 2)}
        </pre>
      ) : (
        <p>No billing account found</p>
      )}
    </div>
  );
}
