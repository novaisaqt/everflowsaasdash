import { NextRequest, NextResponse } from "next/server"
import { callOpenAI } from "@/lib/openai"
import { supabaseAdmin } from "@/lib/supabase"
import { requireTenant } from "@/lib/requireTenant"

// Required by Next for dynamic API routes
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    // ✅ FIXED: "owner" → "admin"
    const tenant = await requireTenant("admin")

    const { question } = await req.json()

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid question" },
        { status: 400 }
      )
    }

    // Run all Supabase queries in parallel
    const [tenantsRes, candidatesRes, hotRes, pipelineRes] =
      await Promise.all([
        supabaseAdmin.from("tenants").select("id, name"),

        supabaseAdmin
          .from("candidate_master")
          .select(
            "candidate_id, full_name, tenant_name, pipeline_stage, fit_score"
          )
          .limit(100),

        supabaseAdmin
          .from("candidate_master")
          .select("candidate_id, full_name, fit_score, tenant_name")
          .gte("fit_score", 80)
          .limit(50),

        supabaseAdmin
          .from("candidate_master")
          .select("pipeline_stage"),
      ])

    const context = {
      tenant: tenant?.tenant?.name ?? "Unknown",
      tenant_count: tenantsRes.data?.length ?? 0,
      top_tenants: tenantsRes.data?.slice(0, 10) ?? [],
      sample_candidates: candidatesRes.data ?? [],
      hot_candidates: hotRes.data ?? [],
      pipeline_data: pipelineRes.data ?? [],
    }

    const systemPrompt = `
You are Everflow Recruitment OS assistant.
You answer questions for the founder about their recruitment SaaS data.

You are given JSON context with:
- tenant_count
- top_tenants
- sample_candidates
- hot_candidates
- pipeline_data

You MUST:
- Use the context above
- Be concise and actionable
- If info is missing, say exactly what is missing
`

    const answer = await callOpenAI([
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
User question:
${question}

Context:
${JSON.stringify(context, null, 2)}
        `,
      },
    ])

    return NextResponse.json({ answer })

  } catch (error: any) {
    console.error("Assistant Query Error:", error)

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
