import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { requireTenant } from "@/lib/requireTenant"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    // Ensure tenant is valid
    const tenant = await requireTenant("admin")

    // Lazy-load Supabase (prevents build-time crash)
    const supabaseAdmin = getSupabaseAdmin()

    const body = await req.json()

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      )
    }

    const {
      candidate_id,
      note,
      tagged_by = "system",
    } = body

    if (!candidate_id || !note) {
      return NextResponse.json(
        { error: "Missing candidate_id or note content" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from("candidate_notes")
      .insert({
        candidate_id,
        note,
        tagged_by,
        tenant_id: tenant.tenant.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase note insert error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      note: data,
    })

  } catch (error: any) {
    console.error("Notes Error:", error)

    return NextResponse.json(
      { error: error.message || "Internal error while saving note" },
      { status: 500 }
    )
  }
}
