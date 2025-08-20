import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await signup(form);
      nav("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-violet-100 p-6">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Website Name / Logo */}
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
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 rounded-lg font-semibold text-lg bg-gradient-to-r from-teal-500 to-violet-500 text-white shadow-md hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:text-violet-500 font-medium transition"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
