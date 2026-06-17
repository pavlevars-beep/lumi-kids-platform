/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lumi: {
          // Brand palette from brand guide
          primary: '#FF4B4B',       // Primary Red
          'primary-light': '#FFE5E5',
          orange: '#FF9E3D',        // Primary Orange
          yellow: '#FFD700',        // Primary Yellow
          green: '#8BC34A',         // Primary Green
          blue: '#03A9F4',          // Primary Blue
          'dark-blue': '#0277BD',   // Secondary Dark Blue
          secondary: '#03A9F4',     // alias → Primary Blue
          'secondary-light': '#E1F5FE',
          warm: '#FFFBF0',
          'warm-dark': '#FFF3D0',
          sage: '#8BC34A',
          sky: '#03A9F4',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(255, 75, 75, 0.15)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 30px rgba(3, 169, 244, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
