/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        "avenir-book": "400",
        "montserrat-regular": "400",
        "montserrat-medium": "500",
      },
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d6fe",
          300: "#a5b8fc",
          400: "#8b93f8",
          500: "#667eea",
          600: "#5a6fd8",
          700: "#4c5bc5",
          800: "#3e4ba0",
          900: "#364080",
        },
        gold: {
          50: "#fffdf0",
          100: "#fffadb",
          200: "#fff3b8",
          300: "#ffe885",
          400: "#ffd700",
          500: "#f4c430",
          600: "#d4af37",
          700: "#b8860b",
          800: "#9a7209",
          900: "#7d5e0a",
        },
        rose: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#e8b4a0",
          600: "#db7093",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        card: "0 4px 15px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 25px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
