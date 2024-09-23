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
        blue: {
          veryLight: "#E2F3FF",
          light: "#4374A4",
          normal: "#0073C6",
          dark: "#2C3E50",
        },
        green: "#58D68D",
        purple: {
          veryLight: "#F1E8FF",
          normal: "#6E00FA",
        },
        red: {
          veryLight: "#FFF2F2",
          normal: "#FF4E4E",
        },
        lilac: {
          veryLight: "#FFE7FB",
          normal: "#B50097",
        },
        transparentBlack: "rgba(0,0,0,0.45)",
        transparentWhite: "rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
