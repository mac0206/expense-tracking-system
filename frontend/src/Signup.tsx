import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "./api/apiClient";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.username) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await apiClient.post("/signup", form);

      console.log("Signup Response:", response); // ✅ Debug output

      // Handle various success possibilities
      if (
        response?.status === 201 ||
        response?.status === 200 ||
        response?.data?.success ||
        response?.data?.message === "User created"
      ) {
        toast.success("Sign up successfully!");
        navigate("/"); // ✅ Immediate navigation
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-100 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Sign Up
        </h2>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-1">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
        </div>

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
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 active:scale-90 duration-200"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
