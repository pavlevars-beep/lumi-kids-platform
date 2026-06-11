/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lumi: {
          primary: '#FF6B6B',
          'primary-light': '#FFE5E5',
          secondary: '#4ECDC4',
          'secondary-light': '#E0F7F6',
          accent: '#FFD93D',
          warm: '#FFF9F0',
          'warm-dark': '#FFF0DC',
          sage: '#8BC34A',
          lavender: '#B39DDB',
          sky: '#64B5F6',
          coral: '#FF8A65',
          peach: '#FFCCBC',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(255, 107, 107, 0.1)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
