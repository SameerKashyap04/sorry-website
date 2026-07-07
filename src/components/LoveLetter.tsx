"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recordAction } from "@/lib/supabase";

interface LoveLetterProps {
  visitId: string | null;
  onNext: () => void;
}

const LETTER_LINES = [
  "Dear Mugdha,",
  "",
  "I want to start by saying I'm truly sorry.",
  "",
  "I misunderstood something and, because of that, I ended up treating you unfairly.",
  "",
  "That wasn't right of me, and I regret it deeply.",
  "",
  "Looking back, I should have talked to you directly instead of jumping to conclusions.",
  "",
  "I let a misunderstanding get in the way of how I treated you, and that's completely on me.",
  "",
  "I know saying sorry once isn't enough for how much this may have hurt you, so please know I mean this with all my heart —",
  "",
  "I'm sorry, a thousand times over.",
  "",
  "I truly hope you can find it in you to forgive me.",
  "",
  "I value you, and I don't want this misunderstanding to come between us.",
  "",
  "If you're willing, I'd really like the chance to talk things through properly, so nothing like this happens again.",
  "",
  "",
  "With sincere regret and respect,",
  "Sameer :)",
];

export default function LoveLetter({ visitId, onNext }: LoveLetterProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [letterComplete, setLetterComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowLetter(true);
      if (visitId) recordAction(visitId, { letter_opened: true });
    }, 1000);
  };

  useEffect(() => {
    if (!showLetter) return;

    if (visibleLines < LETTER_LINES.length) {
      // Much faster writing animation to prevent lagging
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        if (letterRef.current) {
          letterRef.current.scrollTop = letterRef.current.scrollHeight;
        }
      }, LETTER_LINES[visibleLines] === "" ? 80 : 150);
      return () => clearTimeout(timeout);
    } else {
      setLetterComplete(true);
    }
  }, [showLetter, visibleLines]);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(onNext, 600);
  };

  return (
    <motion.div
      className="section-container relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.div
            key="envelope"
            className="main-card flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-text text-2xl sm:text-3xl">
              I wrote something for you... 💌
            </h2>

            {/* Sorry GIF */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sorry.png"
              alt="Sorry"
              className="gif-image"
              style={{ width: "200px", height: "auto" }}
            />

            {/* Envelope */}
            <motion.div
              className="envelope cursor-pointer"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="envelope-inner" />
              <div className={`envelope-flap ${isEnvelopeOpen ? "open" : ""}`} />
              <div className="envelope-body" />
              <div className="letter-paper">
                <div className="flex flex-col gap-1 p-3 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[2px] rounded"
                      style={{
                        background: "rgba(255, 105, 180, 0.3)",
                        width: `${70 + Math.random() * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              {!isEnvelopeOpen && <div className="envelope-heart">❤️</div>}
            </motion.div>

            {!isEnvelopeOpen && (
              <motion.p
                className="subtext"
                style={{ animation: "bounce 1.5s ease-in-out infinite" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Tap to open 💌
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="main-card"
            style={{ maxWidth: "750px" }}
            initial={{ opacity: 0, rotateX: -15, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Letter paper styling inside the card */}
            <div
              className="relative p-6 sm:p-10 mx-auto bg-white"
              style={{
                backgroundColor: "#fffdf5",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.02)",
                border: "1px solid #e8dcc7",
                borderRadius: "2px",
              }}
            >
              {/* Restored Paper lines aligned with a grid-like border */}
              <div className="absolute inset-0 rounded overflow-hidden pointer-events-none opacity-30">
                <div className="w-full h-full" style={{
                  backgroundSize: "100% 2.3rem", // Matches the text line height roughly
                  backgroundImage: "linear-gradient(to bottom, transparent 2.2rem, rgba(0,100,255,0.15) 2.2rem, rgba(0,100,255,0.15) 2.3rem)",
                  marginTop: "3rem"
                }} />
              </div>

              {/* Notebook Margins */}
              <div
                className="absolute top-0 bottom-0 w-[2px]"
                style={{
                  left: "40px",
                  background: "rgba(220, 50, 50, 0.2)",
                }}
              />
              <div
                className="absolute top-0 bottom-0 w-[1px]"
                style={{
                  left: "45px",
                  background: "rgba(220, 50, 50, 0.2)",
                }}
              />

              {/* Border to frame the text better */}
              <div
                ref={letterRef}
                className="letter-content relative z-10 max-h-[55vh] overflow-y-auto pl-10 sm:pl-12 pr-4 pt-4"
                style={{
                  border: "1px dashed rgba(255, 182, 193, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "8px",
                  paddingBottom: "2rem"
                }}
              >
                {LETTER_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${line === "" ? "h-6" : "mb-3"} ${
                      i === 0
                        ? "text-2xl sm:text-3xl font-bold mb-4"
                        : ""
                    } ${
                      line.startsWith("With sincere") || line === "Sameer :)"
                        ? "font-bold mt-2"
                        : ""
                    } ${
                      line === "I'm sorry, a thousand times over."
                        ? "font-bold text-xl sm:text-2xl"
                        : ""
                    }`}
                    style={{
                      color:
                        i === 0 ||
                        line.startsWith("With sincere") ||
                        line === "Sameer :)" ||
                        line === "I'm sorry, a thousand times over."
                          ? "#e73c7e"
                          : "#44403c",
                      textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}

                {!letterComplete && visibleLines > 0 && (
                  <motion.span
                    className="inline-block w-[2px] h-5 ml-1"
                    style={{ background: "#e73c7e" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>

              <div className="absolute top-3 right-5 text-xl opacity-30">💕</div>
              <div className="absolute bottom-3 left-5 text-lg opacity-20">🩷</div>
            </div>

            {/* Continue button */}
            <AnimatePresence>
              {letterComplete && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.button
                    onClick={handleContinue}
                    className="btn-primary text-xl"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Continue ❤️
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
