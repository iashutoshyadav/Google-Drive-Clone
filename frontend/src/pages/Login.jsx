import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form); // must resolve or throw
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error?.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-teal-100 p-6">
      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-4xl font-extrabold text-violet-600 text-center tracking-wide">
          Storify
        </h1>
        <p className="text-gray-500 text-center mt-1">
          Welcome back, sign in to continue
        </p>

        {err && (
          <div className="mt-3 text-sm text-red-600 bg-red-100 p-2 rounded-lg text-center">
            {err}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            autoComplete="email"
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-lg font-semibold text-lg text-white shadow-md transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-500 to-teal-500 hover:opacity-90"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-violet-600 hover:text-teal-500 font-medium transition">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
