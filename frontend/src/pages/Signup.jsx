import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signup(form);               // must resolve or throw
      navigate("/login", { replace: true });
    } catch (error) {
      setErr(error?.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-violet-100 p-6">
      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-4xl font-extrabold text-teal-600 text-center tracking-wide">
          Storify
        </h1>
        <p className="text-gray-500 text-center mt-1">
          Create your account to start your journey
        </p>

        {err && (
          <div className="mt-3 text-sm text-red-600 bg-red-100 p-2 rounded-lg text-center">
            {err}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            autoComplete="name"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-lg font-semibold text-lg text-white shadow-md transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-teal-500 to-violet-500 hover:opacity-90"}`}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:text-violet-500 font-medium transition">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
