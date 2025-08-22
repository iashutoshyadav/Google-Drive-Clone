import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import FileCard from "../components/FileCard.jsx";
import FolderCard from "../components/FolderCard.jsx";
import UploadModal from "../features/UploadModal.jsx";
import ShareModal from "../features/ShareModal.jsx";
import CreateFolderModal from "../features/CreateFolderModal.jsx";
import DeleteConfirmModal from "../features/DeleteConfirmModal.jsx";
import { useAuth } from "../hooks/useAuth.js";
import {
  listFolder,
  createFolder,
  renameFolder,
  deleteFolder,
} from "../services/folderService.js";
import {
  uploadFile,
  removeFile,
  downloadFile,
  moveFile,
} from "../services/fileService.js";
import { createShare } from "../services/shareService.js";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate(); 
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: "My Drive" }]);
  const [folderId, setFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [recentFiles, setRecentFiles] = useState([]);

  // Modals & UI states

  const [uploadOpen, setUploadOpen] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [shareFile, setShareFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Filtered results based on search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { folders, files };
    return {
      folders: folders.filter((f) => f.name.toLowerCase().includes(q)),
      files: files.filter((f) => f.name.toLowerCase().includes(q)),
    };
  }, [folders, files, query]);

  //Load folder contents
  async function load() {
    if (!token) return;
    const res = await listFolder(token, folderId);
    setFolders(res?.folders || []);
    setFiles(res?.files || []);
    const recent = res?.files?.slice(0, 5).map((f) => ({ id: f.id, name: f.name })) || [];
    setRecentFiles(recent);
  }
  useEffect(() => { load(); }, [folderId, token]);

  // Breadcrumbs management
  function pushCrumb(id, name) {
    setBreadcrumbs((prev) => [...prev, { id, name }]);
    setFolderId(id);
  }

  //create folder
  async function handleCreateFolder(name) {
    await createFolder(token, { name, parent: folderId });
    setNewFolderOpen(false);
    load();
  }

  //upload file
  async function handleUpload(file) {
    const uploaded = await uploadFile(token, file, folderId);
    setUploadOpen(false);
    load();
    if (uploaded) setRecentFiles((prev) => [uploaded, ...prev].slice(0, 5));
  }

  //open file preview
  async function handleOpenFile(file) {
  try {
    const res = await downloadFile(token, file.id);
    const directUrl = res?.url || file?.url;
    if (!directUrl) {
      alert("Unable to open file.");
      return;
    }
    window.open(directUrl, "_blank", "noopener,noreferrer");
  } catch (e) {
    console.error(e);
    alert("Failed to open file.");
  }
}


  // Delete handlers
  function handleDeleteFile(file) { setConfirmDelete({ type: "file", item: file }); }
  function handleDeleteFolder(folder) { setConfirmDelete({ type: "folder", item: folder }); }
  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    const { type, item } = confirmDelete;
     if (type === "file") {
    await removeFile(token, item.id, "file");
  } else if (type === "folder") {
    await deleteFolder(token, item.id);
  }
    setConfirmDelete(null);
    load();
  }

  // Move file to another folder
  async function handleMoveFile(file) {
    const target = prompt("Move to folder ID (leave blank for root):", "");
    if (target !== null) await moveFile(token, file.id, target || null).then(load);
  }

  // Share file
  async function handleShare(email, perm) {
    if (!shareFile) return;
    await createShare(token, { resource_type: "file", resource_id: shareFile.id, target_email: email, permission: perm });
    setShareFile(null);
    alert("Share link created!");
  }

 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setQuery} />
      <div className="flex">
        <Sidebar
          onNewFolder={() => setNewFolderOpen(true)}
          onUpload={() => setUploadOpen(true)}
          recentFiles={recentFiles}
          onOpenRecent={handleOpenFile}
        />
        <main className="flex-1 p-4 sm:p-6">
          <Breadcrumbs items={breadcrumbs} onNavigate={(id) => {
            const idx = breadcrumbs.findIndex((b) => b.id === id);
            if (idx >= 0) { setBreadcrumbs(breadcrumbs.slice(0, idx + 1)); setFolderId(id); }
          }} />

          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-400 rounded-2xl p-6 text-white shadow-md">
              <h2 className="text-xl font-bold">Available Storage</h2>
              <p className="mt-2 text-3xl font-semibold">1.93% Used</p>
              <p className="text-sm">39.6 MB / 15GB</p>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-8 bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Recent Files Uploaded</h2>
              {recentFiles.length === 0 ? <p className="text-gray-500">No files uploaded yet.</p> :
                <ul className="space-y-2">{recentFiles.map(f => <li key={f.id} className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                 onClick={() => handleOpenFile(f)}>{f.name}</li>)}</ul>}
            </div>
          </div>

          {filtered.folders.length > 0 && <>
            <div className="mt-6 text-sm font-semibold text-gray-700">Folders</div>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {filtered.folders.map(f => <FolderCard key={f.id} folder={f} onOpen={() => navigate("/shared")} onRename={async fold => {
                const name = prompt("Rename folder to:", fold.name);
                if (!name) return;
                await renameFolder(token, fold.id, name);
                load();
              }} onDelete={handleDeleteFolder} />)}
            </div>
          </>}

          <div className="mt-6 text-sm font-semibold text-gray-700">Files</div>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {filtered.files.map(file => <FileCard key={file.id} file={file} onOpen={handleOpenFile} onDelete={handleDeleteFile} onMove={handleMoveFile} onShare={setShareFile} />)}
          </div>
        </main>
      </div>


      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleUpload} />
      <CreateFolderModal open={newFolderOpen} onClose={() => setNewFolderOpen(false)} onCreate={handleCreateFolder} />
      <DeleteConfirmModal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleConfirmDelete} label={confirmDelete?.type === "file" ? `Delete ${confirmDelete.item.name}?` : "Delete this folder?"} />
      <ShareModal file={shareFile} onClose={() => setShareFile(null)} onShare={handleShare} />
    </div>
  );
}
