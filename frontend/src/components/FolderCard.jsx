import Tooltip from "../components/ui/Tooltip";
import { Edit2, Trash2 } from "lucide-react";

export default function FolderCard({ folder, onOpen, onRename, onDelete }) {
  return (
    <div className="p-3 rounded-xl shadow-md border bg-white hover:shadow-lg transition">
      {/* Folder Name */}
      <div
        className="h-24 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer"
        onClick={() => onOpen(folder)}
      >
        <span className="text-amber-700 text-sm font-semibold">FOLDER</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm truncate" title={folder.name}>
          {folder.name}
        </div>

        <div className="flex gap-2">
          <Tooltip text="Rename Folder">
            <button
              className="p-1 rounded-md hover:bg-gray-100 transition"
              onClick={() => onRename(folder)}
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </Tooltip>

          <Tooltip text="Delete Folder">
            <button
              className="p-1 rounded-md hover:bg-red-100 transition"
              onClick={() => onDelete(folder)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
