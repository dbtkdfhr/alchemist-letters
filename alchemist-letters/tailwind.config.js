/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#F5F0E8',
          letter: '#FAF5EB',
        },
        ink: {
          DEFAULT: '#3A2A1A',
          dark: '#2A1A0A',
          light: '#5A4A3A',
        },
        accent: {
          brown: '#8B4513',
          gold: '#B8860B',
          danger: '#A04040',
          success: '#4A7A4A',
        },
      },
      fontFamily: {
        handwriting: ['"Nanum Pen Script"', 'cursive'],
        handwriting2: ['Kalam', 'cursive'],
        ui: ['"Noto Sans KR"', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': 'linear-gradient(135deg, #F5F0E8 0%, #EDE5D8 50%, #F5F0E8 100%)',
        'letter-texture': 'linear-gradient(135deg, #FAF5EB 0%, #F5EDE0 50%, #FAF5EB 100%)',
      },
      boxShadow: {
        'paper': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'letter': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)',
        'letter-hover': '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'page-turn': 'pageTurn 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageTurn: {
          '0%': { opacity: '0', transform: 'rotateX(-10deg) translateY(10px)' },
          '100%': { opacity: '1', transform: 'rotateX(0) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
