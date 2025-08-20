import { useState } from "react";

export default function UploadModal({ open, onClose, onUpload }) {
  const [file, setFile] = useState(null);

  if (!open) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    await onUpload(file);  // ✅ calls handleUpload in Dashboard
    setFile(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
