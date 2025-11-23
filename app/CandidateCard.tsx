{/* Actions */}
<div className="mt-2 flex flex-wrap gap-2">
  {/* ✅ FIXED: Pass full candidate only */}
  <ViewCVModal candidate={candidate} />

  <CandidateTimeline candidateId={candidate.candidate_id} />

  {/* Schedule interview */}
  <button
    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
    onClick={() => {
      const url = `/schedule?candidateId=${candidate.candidate_id}`;
      window.open(url, "_blank");
    }}
  >
    Schedule
  </button>

  {/* One-click outreach */}
  <button
    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
    onClick={() => {
      console.log("Trigger outreach for", candidate.candidate_id);
      alert("Outreach flow triggered (wire this to N8N / GHL API)");
    }}
  >
    Outreach
  </button>
</div>
