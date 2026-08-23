import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kazakh: {
          sky: "#00AFCA",
          blue: "#0EA5E9",
          gold: "#E5A910",
          sun: "#FEC506",
          ink: "#0F172A",
          mist: "#F8FAFC",
        },
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(229,169,16,.40), 0 0 28px rgba(254,197,6,.16)",
        "sky-glow": "0 20px 65px rgba(14,165,233,.18)",
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(to right, rgba(14,165,233,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
