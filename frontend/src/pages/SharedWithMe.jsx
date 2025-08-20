import Navbar from "../components/Navbar.jsx";
export default function SharedWithMe() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="text-lg font-semibold">Shared with me</h1>
        <p className="text-sm text-gray-600 mt-2">Connect this to /api/share listing as desired.</p>
      </div>
    </div>
  );
}
