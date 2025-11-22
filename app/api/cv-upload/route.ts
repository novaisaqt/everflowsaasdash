import { NextRequest, NextResponse } from 'next/server';
import { requireTenant } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const tenant = await requireTenant('manager');

  const candidateId = req.nextUrl.searchParams.get('candidateId');
  if (!candidateId) {
    return NextResponse.json({ error: 'Missing candidateId' }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `${tenant.tenantId}/${candidateId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from('cv-files')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  await supabaseAdmin.from('cv_files').insert({
    tenant_id: tenant.tenantId,
    candidate_id: candidateId,
    storage_path: data.path,
    original_filename: file.name,
  });

  return NextResponse.redirect(new URL('/clients', req.url));
}
