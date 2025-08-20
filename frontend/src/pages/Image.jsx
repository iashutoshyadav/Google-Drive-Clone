import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import FileCard from "../components/FileCard.jsx";
import { useAuth } from "../hooks/useAuth";
import { listFiles, downloadFile, removeFile, moveFile } from "../services/fileService";
import ShareModal from "../features/ShareModal.jsx";
import { getFileCategory } from "../utils/fileUtils.js";

export default function Images() {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [shareFile, setShareFile] = useState(null);

async function load() {
  try {
    const res = await listFiles(token);
    console.log("Raw response from backend:", res);

    const fileList = Array.isArray(res) ? res : res?.files || [];
    const imgs = fileList.filter((f) => {
      const filename = f.name || f.filename || f.originalName || f.fileName || "";
      console.log("Checking file:", filename, "=>", getFileCategory(filename));
      return getFileCategory(filename) === "image";
    });

    setFiles(imgs);
  } catch (err) {
    console.error("Error loading images:", err);
    setFiles([]);
  }
}

  useEffect(() => {
    if (token) load();
  }, [token]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className=" flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-lg font-semibold">🖼️ Images</h1>

          {files.length === 0 ? (
            <p className="mt-4 text-gray-500">No images found.</p>
          ) : (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {files.map((f) => (
                <FileCard
                  key={f.id}
                  file={f}
                  onOpen={async (file) => {
                    try {
                      const blob = await downloadFile(token, file.id);
                      const url = URL.createObjectURL(blob);
                      window.open(url, "_blank");
                    
                      setTimeout(() => URL.revokeObjectURL(url), 1000 * 60);
                    } catch (err) {
                      console.error("Error opening image:", err);
                    }
                  }}
                  onDelete={async (file) => {
                    try {
                      await removeFile(token, file.id);
                      load();
                    } catch (err) {
                      console.error("Error deleting image:", err);
                    }
                  }}
                  onMove={async (file) => {
                    const t = prompt("Move to folder ID:", "");
                    try {
                      await moveFile(token, file.id, t || null);
                      load();
                    } catch (err) {
                      console.error("Error moving image:", err);
                    }
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
