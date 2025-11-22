export default function UploadZone() {
  return (
    <div className="p-6 border border-white/10 rounded-xl bg-black/40 space-y-4">
      <h3 className="font-semibold">1. Upload job description</h3>
      <div className="border border-dashed border-white/20 p-4 rounded-lg text-sm text-gray-400">
        Drop / paste a job description here
      </div>

      <h3 className="font-semibold">2. Upload CVs</h3>
      <div className="border border-dashed border-white/20 p-4 rounded-lg text-sm text-gray-400">
        Drop CV files here
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full">
        Run AI Scoring
      </button>
    </div>
  );
}
