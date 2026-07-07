"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { recordVisit } from "@/lib/supabase";

const FloatingHearts = dynamic(() => import("@/components/FloatingHearts"), { ssr: false });
const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });
const HeartCursorTrail = dynamic(() => import("@/components/HeartCursorTrail"), { ssr: false });

import Welcome from "@/components/Welcome";
import LoveLetter from "@/components/LoveLetter";
import ForgiveQuestion from "@/components/ForgiveQuestion";
import FinalSlideshow from "@/components/FinalSlideshow";

type Section = "loading" | "welcome" | "letter" | "forgive" | "slideshow";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("loading");
  const [visitId, setVisitId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSection("welcome");
    }, 2200);

    recordVisit().then((id) => {
      if (id) setVisitId(id);
    });

    return () => clearTimeout(timer);
  }, []);

  const goToLetter = useCallback(() => setCurrentSection("letter"), []);
  const goToForgive = useCallback(() => setCurrentSection("forgive"), []);
  const goToSlideshow = useCallback(() => setCurrentSection("slideshow"), []);

  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-hidden">
      {/* Background layers — always visible */}
      <Particles />
      <FloatingHearts />
      <HeartCursorTrail />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {currentSection === "loading" && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(-45deg, #ee7752, #e73c7e, #ff69b4, #ff1493)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 8s ease infinite",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-7xl sm:text-8xl"
              animate={{
                scale: [1, 1.3, 1, 1.25, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💖
            </motion.div>
            <motion.p
              className="mt-6 text-xl font-bold"
              style={{
                color: "white",
                textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading something special for Mugdha...
            </motion.p>
            <motion.div
              className="mt-5 w-56 h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.3)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "white" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections */}
      <AnimatePresence mode="wait">
        {currentSection === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Welcome onNext={goToLetter} />
          </motion.div>
        )}

        {currentSection === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoveLetter onNext={goToForgive} />
          </motion.div>
        )}

        {currentSection === "forgive" && (
          <motion.div
            key="forgive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForgiveQuestion visitId={visitId} onNext={goToSlideshow} />
          </motion.div>
        )}

        {currentSection === "slideshow" && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalSlideshow />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
