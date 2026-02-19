/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iv: {
          bg: '#090916',
          card: '#13132B',
          'card-border': '#1E1E3F',
          'card-hover': '#1A1A38',
          purple: '#8B5CF6',
          'purple-dark': '#7C3AED',
          pink: '#EC4899',
          'pink-hot': '#F472B6',
          gold: '#EAB308',
          'gold-light': '#FCD34D',
          green: '#22C55E',
          orange: '#F97316',
          'nav-bg': '#0D0D1E',
          'text-muted': '#6B7280',
          'text-secondary': '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-pink': 'linear-gradient(135deg, #EC4899, #D946EF)',
        'gradient-gold': 'linear-gradient(135deg, #EAB308, #F59E0B)',
        'gradient-purple': 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
      },
    },
  },
  plugins: [],
}
