"use client";

import { Candidate } from "@/app/candidates/page";

export default function ViewCVModal({ candidate }: { candidate: Candidate }) {

  if (!candidate.cv_url) {
    return (
      <button className="text-xs border px-2 py-1 rounded bg-gray-100">
        No CV
      </button>
    );
  }

  return (
    <button
      onClick={() => window.open(candidate.cv_url!, "_blank")}
      className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
    >
      View CV
    </button>
  );
}
