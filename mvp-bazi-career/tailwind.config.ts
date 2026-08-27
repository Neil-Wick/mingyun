import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Eastern aesthetic: vermilion red + ink + warm cream
        ink: {
          50: "#f7f6f2",
          100: "#eeebe2",
          200: "#d9d3c1",
          500: "#6b6355",
          700: "#3a352c",
          900: "#1c1a15",
        },
        vermilion: {
          400: "#e85d4a",
          500: "#d4452f",
          600: "#b03622",
        },
        jade: {
          400: "#4fa47a",
          500: "#3d8a63",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
