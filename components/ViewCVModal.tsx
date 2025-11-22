'use client'

import { useState } from 'react'

type Candidate = {
  full_name?: string | null
  email?: string | null
  phone?: string | null
  role?: string | null
  skills?: string[] | null
  experience?: string | null
  cv_url?: string | null
  fit_score?: number | null
  summary?: string | null
}

export default function ViewCVModal({
  candidate
}: {
  candidate: Candidate
}) {
  const [open, setOpen] = useState(false)

  if (!candidate) return null

  const {
    full_name,
    email,
    phone,
    role,
    skills,
    experience,
    cv_url,
    fit_score,
    summary
  } = candidate

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
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-[95%] max-w-5xl h-[90%] p-6 overflow-y-auto relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-neutral-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {full_name || 'Candidate'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT SIDE - INFO */}
              <div className="space-y-4">

                <p><strong>Email:</strong> {email || 'N/A'}</p>
                <p><strong>Phone:</strong> {phone || 'N/A'}</p>
                <p><strong>Role:</strong> {role || 'N/A'}</p>
                <p><strong>Fit Score:</strong> {fit_score ?? 'N/A'}</p>

                {skills && (
                  <div>
                    <h3 className="font-semibold mb-1">Skills</h3>
                    <ul className="list-disc ml-6">
                      {skills.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience && (
                  <div>
                    <h3 className="font-semibold mb-1">Experience</h3>
                    <p>{experience}</p>
                  </div>
                )}

                {summary && (
                  <div>
                    <h3 className="font-semibold mb-1">Summary</h3>
                    <p>{summary}</p>
                  </div>
                )}

              </div>

              {/* RIGHT SIDE - CV VIEWER */}
              <div className="border border-neutral-800 rounded-xl overflow-hidden">

                {cv_url ? (
                  <iframe
                    src={cv_url}
                    className="w-full h-[70vh] rounded-xl"
                  />
                ) : (
                  <div className="p-6 text-center text-neutral-500">
                    No CV uploaded for this candidate
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
