import { createContext, useContext, useState, useEffect } from "react";
import { listFiles } from "../services/fileService";
import { useAuth } from "../hooks/useAuth";

const FileContext = createContext();

export function FileProvider({ children }) {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);

  async function refresh() {
    if (!token) return;
    try {
      const res = await listFiles(token);
      setFiles(res?.files || []);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  }

  useEffect(() => {
    refresh();
  }, [token]);

  return (
    <FileContext.Provider value={{ files, refresh }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  return useContext(FileContext);
}
