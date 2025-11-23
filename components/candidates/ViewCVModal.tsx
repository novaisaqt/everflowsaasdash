"use client";

interface ViewCVModalProps {
  cvUrl: string;
  score: number;
  summary: string;
}

export default function ViewCVModal({
  cvUrl,
  score,
  summary,
}: ViewCVModalProps) {
  const handleOpen = () => {
    if (cvUrl) {
      window.open(cvUrl, "_blank");
    } else {
      alert("No CV URL available");
    }
  };

  return (
    <button
      type="button"
      className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
      onClick={handleOpen}
    >
      View CV (score {score || 0})
    </button>
  );
}
