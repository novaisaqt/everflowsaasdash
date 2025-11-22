import { Candidate } from "./mockData";

export default function DropColumn({
  title,
  color,
  items
}: {
  title: string;
  color: string;
  items: Candidate[];
}) {
  return (
    <div className="rounded-xl bg-slate-900/40 p-4 border border-slate-700">
      <h3 className={`mb-3 font-semibold text-${color}-400`}>
        {title} ({items.length})
      </h3>

      <div className="min-h-[300px] border border-dashed border-slate-600 rounded-lg p-3 space-y-2">
        {items.length === 0 && (
          <p className="text-slate-500 text-sm text-center mt-20">
            Drop candidates here
          </p>
        )}
        {items.map((c) => (
          <div
            key={c.id}
            className="bg-slate-800 border border-slate-700 p-2 rounded-md text-sm"
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
