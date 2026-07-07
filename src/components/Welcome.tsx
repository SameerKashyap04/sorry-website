"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpenHeart = () => {
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
      <motion.div
        className="main-card"
        initial={{ opacity: 0, scale: 0.9, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Cute GIF */}
        <motion.div
          className="mb-5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cute.gif"
            alt="Cute"
            className="gif-image mx-auto"
            style={{ width: "180px", height: "auto" }}
          />
        </motion.div>

        {/* Main heading text */}
        <div className="heading-text mb-8" style={{ minHeight: "110px" }}>
          <TypeAnimation
            sequence={[
              "Hey Mugdha ❤️",
              1500,
              "I made something special for you...",
              1500,
              "I hope you read this till the end 🥺",
              1000,
              () => setShowButton(true),
            ]}
            wrapper="span"
            speed={45}
            cursor={true}
            style={{
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Bouncing emojis */}
        <div
          className="text-4xl mb-6 tracking-widest"
          style={{ animation: "bounce 1s ease infinite" }}
        >
          🥺💕😢💖
        </div>

        {/* Open My Heart button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <motion.button
                onClick={handleOpenHeart}
                className="btn-primary text-xl"
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.97 }}
              >
                Open My Heart ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
