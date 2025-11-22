// src/lib/pipeline.ts

export type StageName = 'New' | 'Screening' | 'Interview' | 'Offer' | 'Placed' | 'Reject';

export function stageNameToId(stage: StageName): string | null {
  switch (stage) {
    case 'New':
      return process.env.PIPELINE_STAGE_NEW_ID ?? null;
    case 'Screening':
      return process.env.PIPELINE_STAGE_SCREENING_ID ?? null;
    case 'Interview':
      return process.env.PIPELINE_STAGE_INTERVIEW_ID ?? null;
    case 'Offer':
      return process.env.PIPELINE_STAGE_OFFER_ID ?? null;
    case 'Placed':
      return process.env.PIPELINE_STAGE_PLACED_ID ?? null;
    case 'Reject':
      // You might have a dedicated reject stage or leave null
      return null;
    default:
      return null;
  }
}

/**
 * Fallback mapping purely from score, in case AI recommended_stage is weird.
 */
export function scoreToStageName(score: number): StageName {
  if (score >= 85) return 'Interview';
  if (score >= 70) return 'Screening';
  if (score >= 50) return 'New';
  return 'Reject';
}

/**
 * Map score to a candidate status string you store in the DB.
 */
export function scoreToStatus(score: number): string {
  if (score >= 85) return 'hot';
  if (score >= 70) return 'warm';
  if (score >= 50) return 'review';
  return 'rejected';
}
