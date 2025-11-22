// src/app/api/cv-upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireTenant } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { scoreCandidateFromText } from '@/lib/ai-scoring';
import { scoreToStatus, stageNameToId, scoreToStageName } from '@/lib/pipeline';

async function fakeExtractTextFromFile(file: File): Promise<string> {
  // TODO: Replace this with real PDF/DOCX extraction, or have n8n send text here.
  // For now we just use the filename as a placeholder.
  return `CV placeholder for ${file.name}. Replace fakeExtractTextFromFile with real extraction or n8n integration.`;
}

export async function POST(req: NextRequest) {
  const tenant = await requireTenant('manager');

  const candidateId = req.nextUrl.searchParams.get('candidateId');
  if (!candidateId) {
    return NextResponse.json({ error: 'Missing candidateId' }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  // 1) Upload file to Supabase storage
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const path = `${tenant.tenantId}/${candidateId}/${Date.now()}-${file.name}`;

  const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
    .from('cv-files')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError || !uploadData) {
    console.error(uploadError);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  // 2) Store cv_files row
  await supabaseAdmin.from('cv_files').insert({
    tenant_id: tenant.tenantId,
    candidate_id: candidateId,
    storage_path: uploadData.path,
    original_filename: file.name,
  });

  // 3) Fetch candidate basic info
  const { data: candidate, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('id', candidateId)
    .maybeSingle();

  if (candidateError || !candidate) {
    console.error(candidateError);
    return NextResponse.redirect(new URL('/clients', req.url));
  }

  // 4) Extract text (placeholder function for now)
  const cvText = await fakeExtractTextFromFile(file);

  // 5) Call AI scoring
  let ai;
  try {
    ai = await scoreCandidateFromText({
      fullName: candidate.full_name,
      currentTitle: candidate.current_title,
      source: candidate.source,
      cvText,
    });
  } catch (e) {
    console.error('AI scoring error:', e);
    // Still redirect; you just won't have AI data yet
    return NextResponse.redirect(new URL('/clients', req.url));
  }

  const fitScore = ai.fit_score ?? 0;
  const recommendedStageName = ai.recommended_stage ?? scoreToStageName(fitScore);
  const stageId = stageNameToId(recommendedStageName);

  // 6) Insert cv_analysis row
  await supabaseAdmin.from('cv_analysis').insert({
    candidate_id: candidateId,
    fit_score: fitScore,
    seniority: ai.seniority,
    summary: ai.summary,
    tags: ai.tags,
    raw_text: cvText,
  });

  // 7) Update candidate status
  const newStatus = scoreToStatus(fitScore);
  await supabaseAdmin
    .from('candidates')
    .update({ status: newStatus })
    .eq('id', candidateId);

  // 8) Optionally create or update an opportunity
  if (stageId) {
    // Find existing opportunity for this candidate
    const { data: existingOpp } = await supabaseAdmin
      .from('opportunities')
      .select('*')
      .eq('candidate_id', candidateId)
      .maybeSingle();

    if (existingOpp) {
      await supabaseAdmin
        .from('opportunities')
        .update({ stage_id: stageId })
        .eq('id', existingOpp.id);
    } else {
      await supabaseAdmin.from('opportunities').insert({
        tenant_id: tenant.tenantId,
        candidate_id: candidateId,
        company_name: null,
        job_title: candidate.current_title,
        value: null,
        stage_id: stageId,
        owner_id: null,
      });
    }
  }

  // 9) Log in automation_log
  await supabaseAdmin.from('automation_log').insert({
    tenant_id: tenant.tenantId,
    candidate_id: candidateId,
    event_type: 'CV_UPLOADED_AND_SCORED',
    details: {
      fit_score: fitScore,
      recommended_stage: recommendedStageName,
      tags: ai.tags,
    },
  });

  // TODO: If you want, you can call a GHL push endpoint here when fitScore > 70

  return NextResponse.redirect(new URL('/clients', req.url));
}
