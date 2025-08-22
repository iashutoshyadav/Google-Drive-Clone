import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../hooks/useAuth.js"; // ✅ create this if not present

export default function SharedWithMe() {
  const { token } = useAuth();
  const [sharedFiles, setSharedFiles] = useState([]);

  useEffect(() => {
    async function loadShared() {
      if (!token) return;
      const res = await listShares(token);
      setSharedFiles(res || []);
    }
    loadShared();
  }, [token]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="text-lg font-semibold">Shared with me</h1>
        {sharedFiles.length === 0 ? (
          <p className="text-sm text-gray-600 mt-2">No files shared yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {sharedFiles.map((f) => (
              <li
                key={f.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {f.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
