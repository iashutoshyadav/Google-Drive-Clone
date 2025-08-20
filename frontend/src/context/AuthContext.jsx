import { createContext, useEffect, useState } from "react";
import { me as apiMe, login as apiLogin, signup as apiSignup } from "../services/authService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // auto-fetch user when token exists
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await apiMe(token);
        if (!ignore) setUser(res?.user || null);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [token]);

  // ---- Login ----
  async function login({ email, password }) {
    const res = await apiLogin({ email, password });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, message: res?.message || "Login failed" };
  }

  // ---- Signup ----
  async function signup({ name, email, password }) {
    const res = await apiSignup({ name, email, password });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, message: res?.message || "Signup failed" };
  }

  // ---- Logout ----
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
