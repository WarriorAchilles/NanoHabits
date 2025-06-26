/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'light': ['Poppins', 'system-ui', 'sans-serif'],
        'medium': ['Poppins', 'system-ui', 'sans-serif'],
        'bold': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['SpaceMono', 'monospace'],
      },
      colors: {
        // Custom color palette
        'off-black': '#1A1A1A',
        'off-white': '#F8F6F1',
        
        // Semantic colors that work with dark mode
        'text-primary': {
          DEFAULT: '#1A1A1A',
          dark: '#F8F6F1',
        },
        'bg-primary': {
          DEFAULT: '#F8F6F1',
          dark: '#1A1A1A',
        },
        'text-secondary': {
          DEFAULT: '#4A5568',
          dark: '#A0AEC0',
        },
        'bg-secondary': {
          DEFAULT: '#F7FAFC',
          dark: '#2D3748',
        },
      },
    },
  },
  plugins: [],
} 