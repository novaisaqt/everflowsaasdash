import { Candidate } from "./mockData";

export default function DropColumn({
  title,
  items,
}: {
  title: string;
  items: Candidate[];
}) {
  return (
    <div className="border border-white/10 rounded-xl p-4 bg-black/40 min-h-[300px]">
      <h3 className="mb-4 text-sm font-semibold">{title} ({items.length})</h3>

      <div className="space-y-3">
        {items.map((c) => (
          <div
            key={c.id}
            className="p-2 border border-white/10 rounded bg-white/5"
          >
            {c.name} — {c.score}%
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-gray-500 text-center pt-10">
            Empty
          </p>
        )}
      </div>
    </div>
  );
}
