// src/lib/ai-scoring.ts
import { callOpenAI } from './openai';

export type CandidateAIResult = {
  fit_score: number; // 0-100
  seniority: string;
  tags: string[];
  summary: string;
  recommended_stage: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Placed' | 'Reject';
};

/**
 * Ask AI to score a candidate given extracted CV text + basic metadata.
 */
export async function scoreCandidateFromText(args: {
  fullName: string;
  currentTitle?: string | null;
  source?: string | null;
  cvText: string;
}) {
  const { fullName, currentTitle, source, cvText } = args;

  const prompt = `
You are an expert recruitment assistant.

You will receive:
- Candidate name
- Current title (if any)
- Source (if any)
- Extracted CV text

Return STRICT JSON with keys:
- fit_score (0-100 integer)
- seniority (string, e.g. "Junior", "Mid", "Senior", "Lead")
- tags (array of 3-10 short skill tags)
- summary (1-3 sentence summary of their profile)
- recommended_stage (one of: "New", "Screening", "Interview", "Offer", "Placed", "Reject")

No other text, ONLY JSON.

Candidate:
Name: ${fullName}
Title: ${currentTitle ?? 'N/A'}
Source: ${source ?? 'N/A'}

CV:
${cvText.slice(0, 6000)}
`;

  const raw = await callOpenAI([
    {
      role: 'system',
      content: 'You are a JSON-only recruitment scoring engine.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ]);

  let parsed: CandidateAIResult;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse AI JSON:', raw);
    throw new Error('AI JSON parse error');
  }

  return parsed;
}
