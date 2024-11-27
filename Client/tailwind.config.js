/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, TSX files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    fontFamily: {
      'cocogoose': ['cocogoose']
    },
    extend: {
      colors: {
        'sapp-green': '#98C98E',
        'sapp-lime': '#C1E0BA',
        'sapp-leaf': '#478C38',
        'sapp-deep': '#2A6960',
        'sapp-blue': '#9AB9B4'
      },
    }
  }
};


