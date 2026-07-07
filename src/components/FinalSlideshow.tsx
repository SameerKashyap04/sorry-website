"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recordAction } from "@/lib/supabase";

const SLIDES = [
  { src: "/images/mugdha1.jpg", text: "You have such a wonderful smile..." },
  { src: "/images/mugdha2.jpg", text: "Always bringing great energy ✨" },
  { src: "/images/mugdha3.jpg", text: "I really value our friendship 💛" },
  { src: "/images/mugdha4.jpg", text: "You're such a great person to be around 😊" },
  { src: "/images/mugdha5.jpg", text: "I'm lucky to have a friend like you 🌟" },
  { src: "/images/mugdha6.jpg", text: "Truly one of a kind! ✨" },
  { src: "/images/mugdha7.jpg", text: "Thank you for being so understanding 💛" },
];

interface FinalSlideshowProps {
  visitId: string | null;
}

export default function FinalSlideshow({ visitId }: FinalSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visitId) recordAction(visitId, { slideshow_opened: true });
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="section-container relative z-10 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="main-card relative"
        style={{ maxWidth: "600px", minHeight: "650px", overflow: "hidden" }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full h-full"
          >
            {/* Photo Polaroid Frame */}
            <div className="p-4 bg-white rounded-lg shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SLIDES[index].src}
                alt="Mugdha"
                className="rounded w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] object-cover"
              />
            </div>
            
            {/* Compliment */}
            <motion.p
              className="mt-8 text-2xl font-bold"
              style={{ color: "#e73c7e", fontFamily: "'Comic Sans MS', cursive" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {SLIDES[index].text}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === index ? "#ff1493" : "rgba(255, 105, 180, 0.3)",
                transform: i === index ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
