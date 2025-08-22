import { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: "class", 
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,vue,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        brand: {
          DEFAULT: "#1E40AF", // primary blue
          light: "#3B82F6",   // lighter blue
          gray: "#A2A2A2",    // gray (buttons)
          accent: "#FFD798",  // accent golden
        },
        neutral: {
          light: "#303531",   // light gray
          DEFAULT: "#202221", // mid gray
          dark: "#021515",    // dark
        },
      },
      fontFamily: {
        header: ["Cinzel", "sans-serif"],
        default: ["Nunito", "sans-serif"],
        subheader: ["Montserrat", "sans-serif"]
      },
    },
  },
  plugins: [],
};

export default config;
