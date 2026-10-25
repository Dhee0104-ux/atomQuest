/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7', // vibrant cyan-blue
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49', // deep navy
          950: '#031726',
        },
        navy: {
          800: '#0e1e38',
          900: '#0a1526',
          950: '#060d18',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        },
        status: {
          good: '#059669',
          goodBg: '#ecfdf5',
          warning: '#d97706',
          warningBg: '#fffbeb',
          danger: '#dc2626',
          dangerBg: '#fef2f2',
          info: '#2563eb',
          infoBg: '#eff6ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
