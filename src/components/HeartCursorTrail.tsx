"use client";

import { useEffect, useCallback, useRef } from "react";

const TRAIL_HEARTS = ["❤️", "💖", "💕", "🩷", "💗"];

export default function HeartCursorTrail() {
  const lastTimeRef = useRef(0);
  const isTouchRef = useRef(false);

  const createHeart = useCallback((x: number, y: number) => {
    const heart = document.createElement("div");
    heart.className = "heart-trail";
    heart.textContent = TRAIL_HEARTS[Math.floor(Math.random() * TRAIL_HEARTS.length)];
    heart.style.left = `${x - 7}px`;
    heart.style.top = `${y - 7}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      const now = Date.now();
      if (now - lastTimeRef.current < 80) return;
      lastTimeRef.current = now;
      createHeart(e.clientX, e.clientY);
    };

    const handleTouchStart = () => {
      isTouchRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 120) return;
      lastTimeRef.current = now;
      const touch = e.touches[0];
      if (touch) {
        createHeart(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [createHeart]);

  return null;
}
