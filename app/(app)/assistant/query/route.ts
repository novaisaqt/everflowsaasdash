// src/app/api/assistant/query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { callOpenAI } from '@/lib/openai';
import { supabaseAdmin } from '@/lib/supabase';
import { requirePlatformAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await requirePlatformAdmin();

  const { question } = await req.json();
  if (!question || typeof question !== 'string') {
    return NextResponse.json({ error: 'Missing question' }, { status: 400 });
  }

  // Fetch some core stats as context
  const [tenantsRes, candidatesRes, hotRes, pipelineRes] = await Promise.all([
    supabaseAdmin.from('tenants').select('id, name'),
    supabaseAdmin.from('candidate_master').select('candidate_id, full_name, tenant_name, pipeline_stage, fit_score').limit(100),
    supabaseAdmin
      .from('candidate_master')
      .select('candidate_id, full_name, fit_score, tenant_name')
      .gte('fit_score', 80)
      .limit(50),
    supabaseAdmin
      .from('candidate_master')
      .select('pipeline_stage, count:candidate_id')
      .group('pipeline_stage'),
  ]);

  const context = {
    tenant_count: tenantsRes.data?.length ?? 0,
    top_tenants: (tenantsRes.data ?? []).slice(0, 10),
    sample_candidates: candidatesRes.data ?? [],
    hot_candidates: hotRes.data ?? [],
    pipeline_distribution: pipelineRes.data ?? [],
  };

  const systemPrompt = `
You are Everflow Recruitment OS assistant.
You answer questions for the founder about their recruitment SaaS data.

You are given JSON context with:
- tenant_count
- top_tenants
- sample_candidates (up to 100 rows)
- hot_candidates (fit_score >= 80)
- pipeline_distribution

You MUST:
- Reason from the provided context
- Be concise and practical
- If context is insufficient, say what ELSE you'd need.

Answer in friendly but professional tone.
`;

  const userPrompt = `
User question:
${question}

Here is your JSON context:
${JSON.stringify(context, null, 2)}
`;

  const answer = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);

  return NextResponse.json({ answer });
}
