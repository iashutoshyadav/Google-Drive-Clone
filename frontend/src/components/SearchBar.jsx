import { useState } from "react";
export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex-1 max-w-xl rounded-2xl">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value); }}
        className="input"
        placeholder="Search your files and folders..."
      />
    </div>
  );
}
