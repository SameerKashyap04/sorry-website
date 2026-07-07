"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getResponses, type VisitResponse } from "@/lib/supabase";

export default function AdminDashboard() {
  const [responses, setResponses] = useState<VisitResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getResponses();
    setResponses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const latestResponse = responses.length > 0 ? responses[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-rose-700">
          ❤️ Mugdha&apos;s Response Dashboard
        </h2>
        <motion.button
          onClick={fetchData}
          className="btn-secondary px-4 py-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh 🔄
        </motion.button>
      </div>

      {loading && responses.length === 0 ? (
        <div className="text-center py-12">
          <motion.div
            className="text-4xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            💕
          </motion.div>
          <p className="text-rose-400 mt-4">Loading...</p>
        </div>
      ) : !latestResponse ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-5xl mb-4">🥺</p>
          <p className="text-rose-500 text-lg">
            No visits recorded yet.
          </p>
          <p className="text-rose-400 text-sm mt-2">
            Make sure Supabase is configured and Mugdha has visited the site.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Visit Status Card */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌐</span>
              <h3 className="text-lg font-semibold text-rose-700">
                Website Visit
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  latestResponse.website_opened
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {latestResponse.website_opened ? "✅ Opened" : "❌ Not opened"}
              </span>
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🕐</span>
              <h3 className="text-lg font-semibold text-rose-700">
                Opened Time
              </h3>
            </div>
            <p className="text-rose-600 font-medium">
              {latestResponse.opened_at
                ? new Date(latestResponse.opened_at).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })
                : "—"}
            </p>
          </motion.div>

          {/* Device Info Card */}
          <motion.div
            className="glass-card rounded-2xl p-6 col-span-1 sm:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📱</span>
              <h3 className="text-lg font-semibold text-rose-700">
                Visitor Details
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-rose-500 text-sm font-semibold">Device Info</p>
                <p className="text-rose-600 font-medium text-sm break-words">
                  {latestResponse.device_info || "—"}
                </p>
              </div>
              <div>
                <p className="text-rose-500 text-sm font-semibold">Location</p>
                <p className="text-rose-600 font-medium text-sm">
                  {latestResponse.location || "—"}
                </p>
              </div>
              <div>
                <p className="text-rose-500 text-sm font-semibold">Journey Progress</p>
                <p className="text-rose-600 font-medium text-sm">
                  Letter: {latestResponse.letter_opened ? "✅" : "❌"} | 
                  Slideshow: {latestResponse.slideshow_opened ? "✅" : "❌"}
                </p>
              </div>
              <div>
                <p className="text-rose-500 text-sm font-semibold">Hesitation</p>
                <p className="text-rose-600 font-medium text-sm">
                  'No' clicks: {latestResponse.no_attempts || 0}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Forgiveness Card */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💝</span>
              <h3 className="text-lg font-semibold text-rose-700">
                Forgiveness Status
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold ${
                  latestResponse.forgiven
                    ? "bg-rose-100 text-rose-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {latestResponse.forgiven
                  ? "Accepted ❤️"
                  : "Waiting 🥺"}
              </span>
            </div>
          </motion.div>

          {/* Response Card */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💬</span>
              <h3 className="text-lg font-semibold text-rose-700">
                Response
              </h3>
            </div>
            <p className="text-rose-600 font-medium text-lg">
              {latestResponse.response || "No response yet..."}
            </p>
          </motion.div>
        </div>
      )}

      {/* All responses table */}
      {responses.length > 1 && (
        <motion.div
          className="mt-8 glass-card rounded-2xl p-6 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-rose-700 mb-4">
            All Visits ({responses.length})
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rose-100">
                <th className="text-left py-2 px-3 text-rose-500">Time</th>
                <th className="text-left py-2 px-3 text-rose-500">Opened</th>
                <th className="text-left py-2 px-3 text-rose-500">Device</th>
                <th className="text-left py-2 px-3 text-rose-500">Location</th>
                <th className="text-left py-2 px-3 text-rose-500">Letter</th>
                <th className="text-left py-2 px-3 text-rose-500">Slideshow</th>
                <th className="text-left py-2 px-3 text-rose-500">NOs</th>
                <th className="text-left py-2 px-3 text-rose-500">Forgiven</th>
                <th className="text-left py-2 px-3 text-rose-500">Response</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((r) => (
                <tr key={r.id} className="border-b border-rose-50">
                  <td className="py-2 px-3 text-rose-600">
                    {new Date(r.opened_at).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2 px-3">
                    {r.website_opened ? "✅" : "❌"}
                  </td>
                  <td className="py-2 px-3 text-rose-500 text-xs truncate max-w-[150px]" title={r.device_info}>
                    {r.device_info || "—"}
                  </td>
                  <td className="py-2 px-3 text-rose-500 text-xs">
                    {r.location || "—"}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {r.letter_opened ? "✅" : "❌"}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {r.slideshow_opened ? "✅" : "❌"}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-rose-600">
                    {r.no_attempts || 0}
                  </td>
                  <td className="py-2 px-3">
                    {r.forgiven ? "❤️" : "🥺"}
                  </td>
                  <td className="py-2 px-3 text-rose-500">
                    {r.response || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}
