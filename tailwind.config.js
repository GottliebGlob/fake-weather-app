/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          100: "#272f3f",
          200: "#141a24",
        },
        accent: {
          100: "#3c97ff",
        },
      },
    },
  },
  plugins: [],
}
