/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: '100vh',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
