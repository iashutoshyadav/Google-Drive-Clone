import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid, FileText, ImageIcon, Film, Shapes, Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Single Nav Item
const Item = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all
       ${isActive
         ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
         : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"}`
    }
  >
    <Icon className="w-5 h-5 transition-colors group-hover:text-blue-500" />
    <span>{children}</span>
  </NavLink>
);

export default function Sidebar({ onNewFolder, onUpload }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="sticky left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white/80 backdrop-blur-md shadow-lg overflow-y-auto">
      <div className="space-y-3 p-5">
        
        {/* New Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl shadow hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 w-full bg-white rounded-lg shadow-xl border z-20 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    onUpload?.();
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Upload
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    onNewFolder?.();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  New Folder
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-3">
        <Item to="/dashboard" icon={LayoutGrid}>Dashboard</Item>
        <Item to="/documents" icon={FileText}>Documents</Item>
        <Item to="/images" icon={ImageIcon}>Images</Item>
        <Item to="/media" icon={Film}>Media</Item>
        <Item to="/others" icon={Shapes}>About</Item>
      </nav>

      {/* Tips Card */}
      {/* <div className="m-4 mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-inner">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Tips</div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Drag & drop files into the center grid to upload faster.
        </p>
      </div> */}
    </aside>
  );
}
