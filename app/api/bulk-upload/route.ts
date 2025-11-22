import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return Response.json({ error: "Expected an array of CVs" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("candidates")
      .insert(body)
      .select();

    if (error) {
      console.error("Supabase bulk error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, inserted: data?.length });

  } catch (err: any) {
    console.error("Server error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
