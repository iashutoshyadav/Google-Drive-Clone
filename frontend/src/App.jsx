import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Document from "./pages/Document.jsx";
import Image from "./pages/Image.jsx";
import Media from "./pages/Media.jsx";
import Other from "./pages/Other.jsx";
import SharedWithMe from "./pages/SharedWithMe.jsx";
import Trash from "./pages/Trash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (visited) {
      setFirstVisit(false);
    } else {
      localStorage.setItem("visited", "true");
      setFirstVisit(true);
    }
  }, []);

  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard + Other Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/documents" element={<Document />} />
      <Route path="/images" element={<Image />} />
      <Route path="/media" element={<Media />} />
      <Route path="/others" element={<Other />} />
      <Route path="/shared" element={<SharedWithMe />} />
      <Route path="/trash" element={<Trash />} />

      {/* Default Route */}
      <Route
        path="/"
        element={
          firstVisit ? <Navigate to="/login" /> : <Navigate to="/dashboard" />
        }
      />
    </Routes>
  );
}

export default App;
