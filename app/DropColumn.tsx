import { Candidate } from "./mockData";

interface Props {
  title: string;
  color: string;
  candidates: Candidate[];
}

export default function DropColumn({ title, color, candidates }: Props) {
  return (
    <div className={`border border-${color}-500/30 rounded-xl p-4`}>
      <h3 className={`text-${color}-400 mb-3 font-semibold`}>
        {title} ({candidates.length})
      </h3>

      <div className="min-h-[180px] border border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-slate-500">
        {candidates.length === 0 ? "Drop candidates here" : ""}
      </div>
    </div>
  );
}

