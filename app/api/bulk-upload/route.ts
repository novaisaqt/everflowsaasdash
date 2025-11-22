import { NextRequest, NextResponse } from 'next/server'
import { requireTenant } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const tenant = await requireTenant('manager')
  const data = await req.formData()
  const files = data.getAll('files') as File[]

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const path = `${tenant.tenantId}/bulk/${Date.now()}-${file.name}`

    await supabaseAdmin.storage
      .from('cv-files')
      .upload(path, buffer, { contentType: file.type, upsert: true })
  }

  return NextResponse.redirect(new URL('/clients', req.url))
}
