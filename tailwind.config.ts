import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08070A",
        char: "#120B0C",
        ember: "#DC2626",
        emberDim: "#7A1F1F",
        emberBright: "#FF4530",
        ash: "#8A7A78",
        bone: "#F3E9E7",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
