import { Candidate } from "./mockData";

export default function DropColumn({
  title,
  items,
  variant,
  onDrop,
}: {
  title: string;
  items: Candidate[];
  variant: "hire" | "maybe" | "reject";
  onDrop: (id: string) => void;
}) {
  const borderColor =
    variant === "hire"
      ? "border-emerald-500/40"
      : variant === "maybe"
      ? "border-amber-500/40"
      : "border-rose-500/40";

  const titleColor =
    variant === "hire"
      ? "text-emerald-400"
      : variant === "maybe"
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <div
      className={`rounded-xl bg-slate-900/60 p-4 border ${borderColor}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("candidateId");
        if (id) onDrop(id);
      }}
    >
      <h3 className={`mb-3 text-xs font-semibold ${titleColor}`}>
        {title} ({items.length})
      </h3>

      <div className="min-h-[160px] border border-dashed border-slate-700 rounded-lg p-3 space-y-2">
        {items.map((c) => (
          <div
            key={c.id}
            className="text-xs bg-slate-800 border border-slate-700 rounded-md px-2 py-1 flex justify-between"
          >
            <span>{c.name}</span>
            <span className="text-slate-300">{c.score}%</span>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-[11px] text-slate-500 text-center pt-6">
            Drag candidates here
          </p>
        )}
      </div>
    </div>
  );
}
