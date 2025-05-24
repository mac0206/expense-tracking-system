import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "./api/apiClient";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return;
    }

    try {
      console.log("Login form data:", form);
      const res = await apiClient.post("/login", form);
      console.log("Login response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        navigate("/page");
        toast.success("Login Successfully");
      }
    } catch (err: any) {
      console.log("Login error:", err.response);
      toast.error(err.response.data?.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-200 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/Signup")}
            className="text-indigo-600 hover:underline"
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
