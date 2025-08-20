import { useEffect, useState } from "react";

export default function ShareModal({ file, isOpen, onClose }) {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateLink() {
      if (!file) return;
      try {
        const res = await fetch(`/api/files/${file.id}/share`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setLink(data.url);
      } catch (err) {
        console.error("Error generating link:", err);
      } finally {
        setLoading(false);
      }
    }
    if (isOpen && file) {
      setLoading(true);
      setLink("");
      generateLink();
    }
  }, [file, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 w-96">
        <h2 className="font-semibold text-lg mb-2">Share "{file?.name}"</h2>

        {loading ? (
          <p className="text-gray-500">Generating link...</p>
        ) : link ? (
          <div>
            <input
              type="text"
              value={link}
              readOnly
              className="w-full border rounded p-2 mb-2 text-sm"
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => navigator.clipboard.writeText(link)}
            >
              Copy Link
            </button>
          </div>
        ) : (
          <p className="text-red-500">Failed to generate link</p>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
