"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const HEART_EMOJIS = ["❤️", "💖", "💕", "💗", "💝", "🩷", "💜", "😍"];

interface FloatingHeart {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// Mugdha's photos as subtle background decorations
const BG_PHOTOS = [
  { src: "/images/mugdha1.jpg", top: "5%", left: "3%", width: 130, rotation: -8, delay: 0 },
  { src: "/images/mugdha2.jpg", top: "60%", left: "82%", width: 120, rotation: 6, delay: 2 },
  { src: "/images/mugdha3.jpg", top: "15%", left: "85%", width: 110, rotation: -4, delay: 4 },
  { src: "/images/mugdha4.jpg", top: "70%", left: "5%", width: 125, rotation: 5, delay: 6 },
  { src: "/images/mugdha5.jpg", top: "35%", left: "90%", width: 105, rotation: -6, delay: 3 },
  { src: "/images/mugdha6.jpg", top: "80%", left: "45%", width: 115, rotation: 3, delay: 5 },
  { src: "/images/mugdha7.jpg", top: "8%", left: "45%", width: 100, rotation: -3, delay: 1 },
];

export default function FloatingHearts() {
  const heartsRef = useRef<FloatingHeart[]>([]);

  if (heartsRef.current.length === 0) {
    heartsRef.current = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      x: Math.random() * 100,
      y: 10 + Math.random() * 80,
      size: 20 + Math.random() * 18,
      delay: Math.random() * 10,
    }));
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background photos of Mugdha */}
      {BG_PHOTOS.map((photo, i) => (
        <img
          key={`photo-${i}`}
          src={photo.src}
          alt=""
          className="bg-photo"
          style={{
            top: photo.top,
            left: photo.left,
            width: `${photo.width}px`,
            height: `${photo.width * 1.2}px`,
            ["--rotation" as string]: `${photo.rotation}deg`,
            animationDelay: `${photo.delay}s`,
          }}
        />
      ))}

      {/* Floating white hearts like reference */}
      {heartsRef.current.map((heart) => (
        <motion.div
          key={heart.id}
          className="bg-heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
