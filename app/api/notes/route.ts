import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireTenant } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const tenant = await requireTenant('manager')
  const { candidateId, content } = await req.json()

  await supabaseAdmin.from('candidate_notes').insert({
    tenant_id: tenant.tenantId,
    candidate_id: candidateId,
    content,
  })

  return NextResponse.json({ success: true })
}
