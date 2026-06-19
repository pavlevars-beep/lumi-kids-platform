/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // BKS vizuelni identitet: crvena / plava / crna na beloj
        bks: {
          red: '#c8102e',
          'red-dark': '#9c0c24',
          blue: '#0a2d6e',
          'blue-dark': '#06204f',
          ink: '#14181f',
          mist: '#f4f6fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
