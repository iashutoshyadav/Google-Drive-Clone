import { useState } from "react";

export default function CreateFolderModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
      <div className="card p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">New Folder</h3>
        <input className="input mt-3" placeholder="Folder name" value={name} onChange={e=>setName(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={!name.trim()} onClick={()=>onCreate(name.trim())}>Create</button>
        </div>
      </div>
    </div>
  );
}
