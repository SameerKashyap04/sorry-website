"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface MemoryGalleryProps {
  onNext: () => void;
}

const MEMORIES = [
  {
    image: "/images/mugdha1.jpg",
    message: "Some people become special without even trying ❤️",
    rotation: -3,
  },
  {
    image: "/images/mugdha2.jpg",
    message: "Your smile means more than you know",
    rotation: 2,
  },
  {
    image: "/images/mugdha3.jpg",
    message: "These memories are something I never want to lose",
    rotation: -2,
  },
  {
    image: "/images/mugdha4.jpg",
    message: "Every moment with you is worth remembering 💕",
    rotation: 3,
  },
  {
    image: "/images/mugdha5.jpg",
    message: "You make ordinary moments feel extraordinary ✨",
    rotation: -1,
  },
  {
    image: "/images/mugdha6.jpg",
    message: "I made a mistake, but I never wanted to hurt you",
    rotation: 2,
  },
  {
    image: "/images/mugdha7.jpg",
    message: "You deserve all the happiness in the world 🌸",
    rotation: -2,
  },
];

function PolaroidCard({
  memory,
  index,
  isActive,
}: {
  memory: (typeof MEMORIES)[0];
  index: number;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-5 w-full"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 40,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={cardRef}
        className="polaroid mx-auto cursor-grab active:cursor-grabbing"
        style={{
          "--rotation": `${memory.rotation}deg`,
          rotateX,
          rotateY,
          perspective: 800,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        {/* Tape decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/70 rotate-[-2deg] z-10 rounded-sm shadow-sm" />

        <div className="relative w-[260px] h-[300px] sm:w-[300px] sm:h-[350px] overflow-hidden rounded-sm">
          <Image
            src={memory.image}
            alt={`Memory ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 260px, 300px"
            priority={index < 2}
          />
        </div>

        <p className="text-center text-gray-500 text-sm mt-2 font-dancing text-lg">
          {memory.message}
        </p>
      </motion.div>

      <motion.p
        className="text-rose-500 text-base sm:text-lg font-medium text-center max-w-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        &ldquo;{memory.message}&rdquo;
      </motion.p>
    </motion.div>
  );
}

export default function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(onNext, 600);
  };

  const isLastPhoto = currentIndex === MEMORIES.length - 1;

  return (
    <motion.div
      className="section-container relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.h2
          className="text-2xl sm:text-3xl font-dancing text-rose-600 text-center mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Memories 💕
        </motion.h2>

        <motion.p
          className="text-rose-400 text-sm text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentIndex + 1} / {MEMORIES.length}
        </motion.p>

        {/* Photo Cards */}
        <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <PolaroidCard
              key={currentIndex}
              memory={MEMORIES[currentIndex]}
              index={currentIndex}
              isActive={true}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn-secondary px-6 py-3 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          {isLastPhoto ? (
            <motion.button
              onClick={handleContinue}
              className="btn-primary px-8 py-3 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              Continue ❤️
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              className="btn-primary px-8 py-3 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          )}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-5">
          {MEMORIES.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                i === currentIndex
                  ? "bg-rose-500"
                  : "bg-rose-200"
              }`}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
