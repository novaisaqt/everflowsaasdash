"use client";

// A minimal version that only needs candidateId.
// You can upgrade the UI later without touching the types.

interface CandidateTimelineProps {
  candidateId: string;
}

export default function CandidateTimeline({
  candidateId,
}: CandidateTimelineProps) {
  return (
    <button
      type="button"
      className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
      onClick={() => {
        console.log("Open timeline for candidate:", candidateId);
        alert(`Timeline for candidate ${candidateId} (stub)`);
      }}
    >
      Timeline
    </button>
  );
}
