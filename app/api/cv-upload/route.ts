import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { requireTenant } from "@/lib/requireTenant"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    // Ensure valid tenant
    const tenant = await requireTenant("admin")

    // Lazy-load Supabase (prevents build crash)
    const supabaseAdmin = getSupabaseAdmin()

    const body = await req.json()

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid or missing CV data" },
        { status: 400 }
      )
    }

    const {
      full_name,
      email,
      phone,
      role,
      skills,
      experience,
      cv_url,
      fit_score = null,
    } = body

    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Missing required fields (full_name, email)" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from("candidate_master")
      .insert({
        full_name,
        email,
        phone,
        role,
        skills,
        experience,
        cv_url,
        fit_score,
        tenant_id: tenant.tenant.id,
        tenant_name: tenant.tenant.name,
        pipeline_stage: "New",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      candidate: data,
    })
  } catch (error: any) {
    console.error("CV Upload Error:", error)

    return NextResponse.json(
      { error: error.message || "Internal error during CV upload" },
      { status: 500 }
    )
  }
}
