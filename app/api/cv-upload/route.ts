import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabaseAdmin
      .from("candidates")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });

  } catch (err: any) {
    console.error("Server error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
