import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        blush: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        lavender: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
      },
      fontFamily: {
        dancing: ["var(--font-dancing)", "cursive"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-heart": "pulseHeart 1.2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(10px) rotate(-2deg)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.15)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.1)" },
          "60%": { transform: "scale(1)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(244, 63, 94, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(244, 63, 94, 0.6), 0 0 80px rgba(244, 63, 94, 0.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.15)",
        "rose-glow": "0 0 30px rgba(244, 63, 94, 0.3)",
        "rose-glow-lg": "0 0 60px rgba(244, 63, 94, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
