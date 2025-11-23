"use client";

import { useState } from "react";

type Props = {
  cvUrl: string;
  score: number;
  summary: string;
};

export default function ViewCVModal({ cvUrl, score, summary }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="text-xs border px-2 py-1 rounded"
        onClick={() => setOpen(true)}
      >
        View CV
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-2">
              Candidate Overview
            </h2>

            <p className="text-sm mb-1">
              AI Score: <strong>{score}</strong>
            </p>

            <p className="text-sm mb-4">
              {summary || "No summary available"}
            </p>

            {cvUrl ? (
              <iframe
                src={cvUrl}
                className="w-full h-[350px] border"
              />
            ) : (
              <p className="text-sm text-gray-500">
                No CV uploaded
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

