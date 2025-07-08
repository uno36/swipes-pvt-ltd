/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-olive-50',
    'bg-olive-600',
    'hover:bg-olive-700',
    'text-olive-700',
    'text-olive-800',
    'border-olive-200',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f8faf0',
          100: '#eef2d4',
          200: '#e2e7b1',
          300: '#cbd487',
          400: '#a6b14f',
          500: '#808000',
          600: '#6a6a00',
          700: '#555500',
          800: '#404000',
          900: '#2b2b00',
        },
      },
    },
  },
  plugins: [],
};
