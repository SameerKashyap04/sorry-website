"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "mugdha123";

    if (password === adminPassword) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (authenticated) {
    return (
      <div className="min-h-screen p-4 sm:p-8" style={{
        background: "linear-gradient(-45deg, #fdf2f8, #fce7f3, #f3e8ff, #ede9fe)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 12s ease infinite",
      }}>
        <div className="max-w-4xl mx-auto">
          <AdminDashboard />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(-45deg, #fdf2f8, #fce7f3, #f3e8ff, #ede9fe)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 12s ease infinite",
      }}
    >
      <motion.div
        className="glass-card rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔐
        </motion.div>

        <h1 className="text-2xl font-bold text-rose-700 mb-2">
          Admin Access
        </h1>
        <p className="text-rose-400 text-sm mb-6">
          Enter password to view responses
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white/70 text-rose-700 placeholder:text-rose-300 transition-colors"
            autoFocus
          />

          {error && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Wrong password! 🚫
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="btn-primary w-full py-3 font-[family-name:var(--font-inter)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login ❤️
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
