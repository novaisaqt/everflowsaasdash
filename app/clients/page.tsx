return (
  <AppShell>
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <span className="text-sm text-muted-foreground">
          {candidates?.length ?? 0} records
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates?.map((c: any) => (
          <div key={c.candidate_id} className="border rounded-lg p-4 bg-white shadow">

            <h2 className="font-semibold text-lg mb-2">
              {c.full_name ?? "Unnamed Candidate"}
            </h2>

            <p className="text-sm"><strong>Email:</strong> {c.email ?? "N/A"}</p>
            <p className="text-sm"><strong>Stage:</strong> {c.pipeline_stage ?? "N/A"}</p>
            <p className="text-sm"><strong>Score:</strong> {c.fit_score ?? "N/A"}</p>

            <div className="mt-4 flex gap-2">
              {/* ✅ View CV - pass URL, not candidate object */}
              <ViewCVModal
                cvUrl={c.cv_url ?? ""}
                score={c.fit_score ?? 0}
                summary={c.summary ?? ""}
              />

              {/* ✅ Timeline - pass candidate_ID only */}
              <CandidateTimeline candidateId={c.candidate_id} />
            </div>

          </div>
        ))}
      </div>
    </div>
  </AppShell>
)
