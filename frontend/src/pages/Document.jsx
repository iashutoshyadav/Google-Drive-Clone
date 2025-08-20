import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import FileCard from "../components/FileCard.jsx";
import { useAuth } from "../hooks/useAuth";
import { listFiles, downloadFile, removeFile, moveFile } from "../services/fileService.js";
import ShareModal from "../features/ShareModal.jsx";
import { getFileCategory } from "../utils/fileUtils.js";

export default function Documents() {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [shareFile, setShareFile] = useState(null);

async function load() {
  try {
    const res = await listFiles(token);
    console.log("Raw response from backend:", res);

    const fileList = Array.isArray(res) ? res : res?.files || [];
    const docs = fileList.filter((f) => {
      const filename = f.name || f.filename || f.originalName || f.fileName || "";
      console.log("Checking file:", filename, "=>", getFileCategory(filename));
      return getFileCategory(filename) === "document";
    });

    setFiles(docs);
  } catch (err) {
    console.error("Error loading documents:", err);
    setFiles([]);
  }
}


  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-lg font-semibold">Documents</h1>

          {files.length === 0 ? (
            <p className="text-gray-500 mt-4">No documents uploaded yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {files.map((f) => (
                <FileCard
                  key={f.id}
                  file={f}
                  onOpen={async (file) => {
                    const res = await downloadFile(token, file.id);
                    window.open(res.url, "_blank");
                  }}
                  onDelete={async (file) => {
                    await removeFile(token, file.id);
                    load();
                  }}
                  onMove={async (file) => {
                    const t = prompt("Move to folder ID:", "");
                    await moveFile(token, file.id, t || null);
                    load();
                  }}
                  onShare={setShareFile}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <ShareModal
        open={!!shareFile}
        onClose={() => setShareFile(null)}
        onShare={() => setShareFile(null)}
      />
    </div>
  );
}
