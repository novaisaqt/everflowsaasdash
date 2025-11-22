import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { requireTenant } from "@/lib/auth"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})

export async function POST(req: NextRequest) {
  try {
    const tenant = await requireTenant()

    const { candidateId, content } = await req.json()

    if (!candidateId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from("candidate_notes").insert({
      tenant_id: tenant.tenantId,
      candidate_id: candidateId,
      content
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
