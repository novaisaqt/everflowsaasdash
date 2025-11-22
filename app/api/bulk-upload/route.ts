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
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 })
    }

    const uploaded: string[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())

      const path = `${tenant.tenantId}/bulk/${Date.now()}-${file.name}`

      const { error } = await supabaseAdmin.storage
        .from("cv-files")
        .upload(path, buffer, {
          contentType: file.type,
          upsert: true
        })

      if (!error) uploaded.push(path)
    }

    return NextResponse.json({ success: true, files: uploaded })
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
