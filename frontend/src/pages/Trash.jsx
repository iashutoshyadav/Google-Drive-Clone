import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import FileCard from "../components/FileCard.jsx";
import { useAuth } from "../hooks/useAuth";
import { listTrash, restoreItem, permanentlyDeleteItem } from "../services/fileService";

export default function Trash() {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);

  async function load() {
    const res = await listTrash(token);
    // If your API returns { files: [], folders: [] } use this:
    setFiles(res?.files || []);
    // optionally, you can merge folders if needed:
    // setFiles([...(res?.files || []), ...(res?.folders || [])]);
  }

  useEffect(() => { load(); }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-lg font-semibold mb-4">Trash</h1>

        {files.length === 0 ? (
          <p className="text-gray-500">No files in Trash.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {files.map(f => (
              <FileCard
                key={f.id}
                file={f}
                onRestore={async () => { 
                  await restoreItem(token, f.id); 
                  load(); 
                }}
                onDelete={async () => { 
                  await permanentlyDeleteItem(token, f.id); 
                  load(); 
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
