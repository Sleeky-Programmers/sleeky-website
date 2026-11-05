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
        // Brand tokens (developer brief, section 2.2)
        ink: {
          DEFAULT: "#070B10",
          raised: "#0A1016",
        },
        surface: "#0E151D",
        line: "#1C2733",
        slate: "#2C3E50",
        green: {
          DEFAULT: "#58D68D",
          hover: "#7FE3A8",
          deep: "#0F2219",
          ink: "#0E2A1B",
        },
        chip: "#13202B",
        muted: "#9AA7B4",
        soft: "#B7C2CC",
        dim: "#5F6E7C",
        faint: "#6F7D8A",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        site: "1320px",
      },
      transitionTimingFunction: {
        sleek: "cubic-bezier(.16,.84,.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
