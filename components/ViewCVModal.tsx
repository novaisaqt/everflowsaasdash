'use client'
import { useState } from 'react'

export default function ViewCVModal({
  cvUrl,
  score,
  summary,
  tags,
}: {
  cvUrl: string
  score?: number
  summary?: string
  tags?: string[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[11px] px-2 py-1 border border-neutral-700 rounded-lg hover:border-neutral-100"
      >
        View CV
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-[95%] max-w-5xl h-[90%] p-4 space-y-4 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-xs text-neutral-400"
            >
              ✕ Close
            </button>

            <div className="grid grid-cols-3 gap-3 h-full">

              {/* PDF Preview */}
              <div className="col-span-2 h-full border border-neutral-800 rounded-xl overflow-hidden">
                <iframe
                  src={cvUrl}
                  className="w-full h-full"
                />
              </div>

              {/* AI PANEL */}
              <div className="border border-neutral-800 rounded-xl p-3 space-y-3 text-xs">
                <h3 className="text-sm font-semibold">AI Analysis</h3>

                <div>
                  <strong>Fit Score:</strong> {score ?? 'Pending'}
                </div>

                <div>
                  <strong>Summary:</strong>
                  <p className="text-neutral-400 mt-1">
                    {summary ?? 'No analysis yet'}
                  </p>
                </div>

                <div>
                  <strong>Tags:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tags?.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full border border-neutral-700"
                      >
                        {t}
                      </span>
                    )) ?? <span>None</span>}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
