"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { recordForgiveness, recordAction } from "@/lib/supabase";

interface ForgiveQuestionProps {
  visitId: string | null;
  onNext: () => void;
}

const SAD_MESSAGES = [
  "I'm really sorry ❤️\nPlease forgive me 🥺",
  "I promise I'll never do it again 😢💕",
  "You mean the world to me 🌍💖",
  "Please give me another chance 🙏❤️",
  "I'll do anything to make it up to you 💝",
  "You're the most important person to me 🥰",
  "Life isn't the same without your smile 😢💖",
  "I promise to be better for you 🌟❤️",
  "Forgive me please? 🍦💕",
  "I'm so so so sorry 😭❤️",
  "Please Mugdha 🥺❤️",
  "Don't break my heart 💔",
  "One more chance? 🙏",
  "Pretty please with a cherry on top? 🍒🥺",
  "I'll never let you down again 💍❤️",
];

const GIFS = ["/images/sorry.png", "/images/sadlife.gif", "/images/run.gif", "/images/download.gif"];

export default function ForgiveQuestion({ visitId, onNext }: ForgiveQuestionProps) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(
    "Mugdha, will you forgive me? 🥺❤️"
  );
  const [currentGif, setCurrentGif] = useState("/images/cute.gif");
  const [forgiven, setForgiven] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  const createSparkle = (x: number, y: number) => {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = x + (Math.random() - 0.5) * 50 + "px";
      sparkle.style.top = y + (Math.random() - 0.5) * 50 + "px";
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  };

  const createFloatingHeart = () => {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = ["❤️", "💖", "💕", "💗", "💝", "🥰", "😍"][
      Math.floor(Math.random() * 7)
    ];
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  };

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const btnWidth = 180;
    const btnHeight = 60;
    const padding = 20;

    const maxX = rect.width - btnWidth - padding * 2;
    const maxY = 280;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;
    const newRotate = (Math.random() - 0.5) * 15;
    const newScale = Math.max(0.7, 1 - noAttempts * 0.03);

    setNoBtnStyle({
      position: "absolute",
      left: `${newX}px`,
      top: `${newY}px`,
      transform: `rotate(${newRotate}deg) scale(${newScale})`,
      transition: "all 0.15s ease-out",
      zIndex: 50,
    });

    // Sparkle at the button's old position
    createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    createFloatingHeart();
  }, [noAttempts]);

  const handleNoInteraction = useCallback(() => {
    const newCount = noAttempts + 1;
    setNoAttempts(newCount);
    setCurrentMessage(SAD_MESSAGES[(newCount - 1) % SAD_MESSAGES.length]);
    setCurrentGif(GIFS[(newCount - 1) % GIFS.length]);
    moveNoButton();
    if (visitId) recordAction(visitId, { no_attempts: newCount });
  }, [noAttempts, moveNoButton, visitId]);

  const fireConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const heartShape = confetti.shapeFromText({ text: "❤️", scalar: 2 });

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 5,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
        colors: ["#ff69b4", "#ff1493", "#e73c7e", "#ffc0cb", "#ff6b81"],
        shapes: [heartShape, "circle"],
        scalar: 1.3,
      });

      confetti({
        ...defaults,
        particleCount: 3,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: ["#ffb6c1", "#ffc0cb", "#ffe4e6"],
        shapes: ["circle"],
        scalar: 0.9,
      });
    }, 70);
  };

  const handleYes = async () => {
    setForgiven(true);
    fireConfetti();

    // Create explosion of hearts
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createFloatingHeart(), i * 150);
    }

    setTimeout(() => setShowCelebration(true), 600);

    if (visitId) {
      await recordForgiveness(visitId);
    }
  };

  const yesBtnScale = 1 + Math.min(noAttempts * 0.08, 0.7);

  // ============ CELEBRATION SCREEN ============
  if (forgiven) {
    return (
      <motion.div
        className="section-container relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="main-card celebration-bg"
              style={{ background: "rgba(255, 255, 255, 0.95)" }}
              initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Love GIF */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/love.gif"
                alt="Love"
                className="gif-image mx-auto mb-4"
                style={{ width: "180px", height: "auto" }}
              />

              <motion.h2
                className="heading-text mb-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Yay! You forgave me! 😍💖🥳
              </motion.h2>

              <motion.p
                className="subtext text-xl mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You don&apos;t know how much this means to me 🥺
              </motion.p>

              <motion.p
                className="subtext text-xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                I promise I&apos;ll do better ❤️
              </motion.p>

              {/* Dancing emojis */}
              <motion.div
                className="text-4xl tracking-widest"
                style={{ animation: "bounce 1s ease infinite", letterSpacing: "10px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                😊❤️💃🎉✨🥰💕🌟🎊💖🌹😘
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                <motion.button
                  onClick={onNext}
                  className="btn-primary text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I have one more thing to show you... ✨
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ============ QUESTION SCREEN ============
  return (
    <motion.div
      className="section-container relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        ref={containerRef}
        className="main-card"
        initial={{ opacity: 0, scale: 0.9, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ minHeight: "520px" }}
      >
        {/* GIF that changes on NO attempts */}
        <motion.div className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentGif}
            src={currentGif}
            alt="Expression"
            className="gif-image mx-auto"
            style={{ width: "160px", height: "auto" }}
          />
        </motion.div>

        {/* Question / Message */}
        <motion.div
          key={currentMessage}
          className="heading-text mb-6"
          style={{ whiteSpace: "pre-line" }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentMessage}
        </motion.div>

        {/* Attempt counter */}
        {noAttempts > 0 && (
          <motion.p
            className="subtext text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {noAttempts <= 5
              ? `Come on... just click YES! 🥺 (Attempts: ${noAttempts})`
              : noAttempts <= 10
              ? `Please baby! I'm begging you! 😭 (Attempts: ${noAttempts})`
              : `I can do this all day! 💪❤️ (Attempts: ${noAttempts})`}
          </motion.p>
        )}

        {/* Buttons area */}
        <div className="relative" style={{ minHeight: "340px", padding: "20px" }}>
          {/* YES Button */}
          <motion.button
            onClick={handleYes}
            className="btn-primary relative z-20"
            style={{
              fontSize: `${1.3 + noAttempts * 0.04}rem`,
              padding: `${18 + noAttempts * 2}px ${44 + noAttempts * 3}px`,
            }}
            animate={{
              scale: yesBtnScale,
            }}
            transition={{ scale: { duration: 0.3 } }}
            whileHover={{
              scale: yesBtnScale * 1.1,
              y: -8,
              boxShadow: "0 15px 40px rgba(255, 20, 147, 0.5)",
            }}
            whileTap={{ scale: yesBtnScale * 0.97 }}
          >
            Okay, I forgive you 💖
          </motion.button>

          {/* NO Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              handleNoInteraction();
            }}
            onMouseEnter={() => {
              if (!isMobile.current) {
                handleNoInteraction();
              }
            }}
            className="btn-secondary z-10 mt-5"
            style={
              noAttempts === 0
                ? { position: "relative" }
                : noBtnStyle
            }
          >
            No, I&apos;m still angry 😠
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
