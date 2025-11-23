"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CandidateTimeline({
  candidateId,
}: {
  candidateId: string;
}) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!candidateId) return;

    const load = async () => {
      const { data } = await supabase
        .from("candidate_activity")
        .select("*")
        .eq("candidate_id", candidateId)
        .order("created_at", { ascending: false });

      setEvents(data || []);
    };

    load();
  }, [candidateId]);

  return (
    <details className="text-xs">
      <summary className="cursor-pointer">Timeline</summary>

      {events.length === 0 && (
        <p className="mt-1 text-gray-400">No activity yet</p>
      )}

      {events.map((e, i) => (
        <div key={i} className="mt-1 border-l pl-2">
          <p className="font-semibold">{e.type}</p>
          <p className="text-[10px] text-gray-500">
            {new Date(e.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </details>
  );
}
