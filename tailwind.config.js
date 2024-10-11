import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInFromTop: {
          "0%": { transform: "translatey(-100%)" },
          "100%": { transform: "translatey(0)" },
        },

        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        slideInFromLeft: "slideInFromLeft 1s ease-out",
        slideInFromRight: "slideInFromRight 1s ease-out",
        slideInFromTop: "slideInFromTop 1s ease-out",
        fadeIn: "fadeIn 1s ease-out",
        scaleIn: "scaleIn 1s ease-out",
      },
    },
    backgroundImage: {
      loginimgmd: "url('/login1.jpg')",
    },
  },
  plugins: [],
};
