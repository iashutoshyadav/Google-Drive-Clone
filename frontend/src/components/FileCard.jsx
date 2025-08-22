import { useState } from "react";
import { motion } from "framer-motion";
import ShareModal from "../features/ShareModal";
import {
  File, Image, Music, Video, FileText, FileArchive,
  Share2, Move, Trash2, RotateCw
} from "lucide-react";

// Simple Tooltip Component (Pure Tailwind)
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 px-2 py-1 
                        rounded-md text-xs text-white bg-gray-800 shadow-md 
                        z-50 text-center whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
}

export default function FileCard({ file,onOpen, onDelete, onMove, onShare, onRestore }) {
  const [showShare, setShowShare] = useState(false);

   const handleOpen = () => {
    if (typeof onOpen === "function") {
      onOpen(file);
      return;
    }
    if (!file?.url) return;
    const backendOrigin =
      import.meta.env.VITE_FILE_BASE_URL ||
      import.meta.env.VITE_API_URL ||
      "";
    const isAbsolute = /^https?:\/\//i.test(file.url);
    const finalUrl = isAbsolute
      ? file.url
      : `${backendOrigin}${file.url.startsWith("/") ? "" : "/"}${file.url}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const ext = file.mime?.split("/")?.[1]?.toLowerCase() || file.extension?.toLowerCase() || "file";

  const getFileIcon = () => {
    if (["png","jpg","jpeg","gif","svg","webp"].includes(ext)) return <Image className="w-10 h-10 text-blue-400" />;
    if (["mp4","mkv","mov","avi"].includes(ext)) return <Video className="w-10 h-10 text-purple-400" />;
    if (["mp3","wav","ogg"].includes(ext)) return <Music className="w-10 h-10 text-pink-400" />;
    if (["pdf","doc","docx","txt","md"].includes(ext)) return <FileText className="w-10 h-10 text-green-400" />;
    if (["zip","rar","7z","tar","gz"].includes(ext)) return <FileArchive className="w-10 h-10 text-orange-400" />;
    return <File className="w-10 h-10 text-gray-400" />;
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-3 flex flex-col justify-between"
      >
        {/* File Preview */}
        <div
          className="h-28 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
          onClick={handleOpen}
        >
          {getFileIcon()}
        </div>

        {/* File Name */}
        <p
          className="mt-3 text-sm font-medium text-gray-800 truncate text-center w-full h-5"
          title={file.name}
        >
          {file.name}
        </p>

        {/* Action Buttons (Icon only with Tooltip) */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {onShare && (
            <Tooltip text="Share File">
              <button
                className="p-2 border rounded-full hover:bg-blue-50 flex items-center justify-center"
                onClick={() => setShowShare(true)}
              >
                <Share2 size={16} />
              </button>
            </Tooltip>
          )}

          {onMove && (
            <Tooltip text="Move File">
              <button
                className="p-2 border rounded-full hover:bg-yellow-50 flex items-center justify-center"
                onClick={() => onMove(file)}
              >
                <Move size={16} />
              </button>
            </Tooltip>
          )}

          {onRestore ? (
            <Tooltip text="Restore File">
              <button
                className="p-2 border rounded-full hover:bg-green-50 flex items-center justify-center"
                onClick={() => onRestore(file)}
              >
                <RotateCw size={16} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip text="Delete File">
              <button
                className="p-2 border rounded-full hover:bg-red-50 flex items-center justify-center"
                onClick={() => {
                    onDelete(file);
                  
                }}
              >
                <Trash2 size={16} />
              </button>
            </Tooltip>
          )}
        </div>
      </motion.div>

      {/* Share Modal */}
      <ShareModal file={file} isOpen={showShare} onClose={() => setShowShare(false)} />
    </>
  );
}
