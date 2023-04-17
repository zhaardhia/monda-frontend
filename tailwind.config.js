/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-./,
      variants: ['md', 'sm'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7D7987',
      },
      fontFamily: {
        navbar: ['Poppins', 'sans-serif'],
        body: ['Mulish', 'sans-serif'],
        portofolio: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};