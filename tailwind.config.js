module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#427676",
        secondaryColor: "#2c5252",
        taskColor: "rgb(147 197 253)",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Comfortaa: ["Comfortaa", "cursive"],
      },
    },
  },
  plugins: [],
};
