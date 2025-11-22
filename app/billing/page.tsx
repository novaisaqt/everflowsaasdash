import { supabaseAdmin } from "@/lib/supabase";
import { requireTenant } from "@/lib/requireTenant";

export default async function BillingPage() {
  const tenant = await requireTenant("manager");

  const { data, error } = await supabaseAdmin
    .from("billing_accounts")
    .select("*")
    .eq("tenant_id", tenant.tenantId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
