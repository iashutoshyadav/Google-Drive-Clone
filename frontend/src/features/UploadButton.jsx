import { useState } from "react";

export default function UploadModal({ open, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
      <div className="card p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Upload file</h3>
        <input type="file" className="mt-3" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={!file} onClick={()=>onUpload(file)}>Upload</button>
        </div>
      </div>
    </div>
  );
}
