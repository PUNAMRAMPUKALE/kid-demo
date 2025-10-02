// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        skyblue: "#8DD3FF",
        sunshine: "#FFD166",
        leaf: "#7AD08D",
        bubblegum: "#FF8DC7",
        grape: "#A78BFA",
        inky: "#0F172A",
        milk: "#F8FAFC",
      },
      fontFamily: {
        friendly: ['"Baloo 2"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 22px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        bubble: "1.25rem",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        sm: "0rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem",
      },
    },
  },
  plugins: [],
};
