import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { requireTenant } from "@/lib/requireTenant"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    // Ensure tenant is valid
    const tenant = await requireTenant("admin")

    // Lazy-load Supabase (safe for Vercel build)
    const supabaseAdmin = getSupabaseAdmin()

    const body = await req.json()

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid payload. Expected an array of candidates" },
        { status: 400 }
      )
    }

    if (body.length === 0) {
      return NextResponse.json(
        { error: "No candidates provided for bulk upload" },
        { status: 400 }
      )
    }

    // Clean and normalise candidates
    const candidates = body.map((c) => ({
      full_name: c.full_name || null,
      email: c.email || null,
      phone: c.phone || null,
      role: c.role || null,
      skills: c.skills || null,
      experience: c.experience || null,
      cv_url: c.cv_url || null,
      fit_score: c.fit_score || null,
      pipeline_stage: c.pipeline_stage || "New",
      tenant_id: tenant.tenant.id,
      tenant_name: tenant.tenant.name,
    }))

    // Remove obviously empty rows
    const validCandidates = candidates.filter(
      (c) => c.full_name && c.email
    )

    if (validCandidates.length === 0) {
      return NextResponse.json(
        { error: "No valid candidates (must include name & email)" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from("candidate_master")
      .insert(validCandidates)
      .select()

    if (error) {
      console.error("Bulk insert error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      inserted: data?.length || 0,
      candidates: data,
    })
  } catch (error: any) {
    console.error("Bulk Upload Error:", error)

    return NextResponse.json(
      { error: error.message || "Internal error during bulk upload" },
      { status: 500 }
    )
  }
}
