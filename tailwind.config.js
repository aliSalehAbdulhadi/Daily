module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#427676',
        secondaryColor: '#2c5252',
        taskColor: 'rgb(147 197 253)',
        primaryLight: '#F2F2F2',
        secondaryLight: '#56a691',
        textLight: '#2c3635',
        textDark: '#ffffff',
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Comfortaa: ['Comfortaa', 'cursive'],
      },
    },
    screens: {
      xs: '420px',
      sm: '640px',
      semiSm: '840px',
      md: '1100px',
      lg: '1280px',
      xl: '1300px',
      xxl: '1450px',
      xxxl: '1600px',
    },
  },
  plugins: [],
};
