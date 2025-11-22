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

    const formData = await req.formData()
    const file = formData.get("file") as File
    const candidateId = formData.get("candidateId") as string

    if (!file || !candidateId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const path = `${tenant.tenantId}/${candidateId}/${Date.now()}-${file.name}`

    const { error } = await supabaseAdmin.storage
      .from("cv-files")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, path })
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
