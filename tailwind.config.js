module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#427676",
        secondaryColor: "rgb(253 224 71)",
        taskColor: "rgb(147 197 253)",
      },
    },
  },
  plugins: [],
};
