import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import SearchBar from "./SearchBar.jsx";
import { Bell, FolderOpen, Trash2, LogOut } from "lucide-react";

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
      <div className=" px-4 py-3 flex items-center gap-6">
        
        {/* Brand Logo */}
        <Link to="/" className="font-bold text-xl  tracking-tight flex items-center gap-1">
          <span className="text-blue-600 ">Storify</span>
          <span className="text-gray-800">Drive</span>
        </Link>

        {/* Search bar (only on dashboard/home) */}
        
          <div className="flex-1 max-w-lg mx-auto">
            <SearchBar onSearch={onSearch} />
          </div>
        
        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Shared */}
          <button
            onClick={() => nav("/shared")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Shared Files"
          >
            <FolderOpen className="w-5 h-5 text-gray-600" />
          </button>

          {/* Trash */}
          <button
            onClick={() => nav("/trash")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Trash"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="relative group">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer select-none">
              {user?.name?.[0] || "U"}
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user?.name || "User"}
              </div>
              <button
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  logout();      
                  nav("/login");
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
