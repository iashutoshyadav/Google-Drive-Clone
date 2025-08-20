import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto space-y-6">

          {/* About App */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">About This App</h1>
            <p className="text-gray-700">
              This is a Google Drive clone built using React for the frontend and Node.js/Express for the backend.
              It uses Supabase for file storage and authentication, allowing you to upload, download, organize,
              and share files seamlessly.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Upload and download files</li>
              <li>Create, rename, and delete folders</li>
              <li>Move files between folders</li>
              <li>Soft-delete files (move to trash) and restore them</li>
              <li>Share files with other users via email</li>
              <li>Search files and folders</li>
              <li>View recently uploaded files</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Frontend: React + Tailwind CSS</li>
              <li>Backend: Node.js + Express</li>
              <li>Database & Storage: Supabase</li>
              <li>Authentication: JWT & Supabase Auth</li>
              <li>Icons: Lucide React</li>
            </ul>
          </div>

          {/* Author */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Author</h2>
            <p className="text-gray-700">
              Developed by Ashutosh Yadav. This project is for learning and practice purposes.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
