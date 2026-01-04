import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cp365: {
          bg: '#F4F4F5',
          surface: '#FFFFFF',
          primary: '#F5A54A',
          primaryDark: '#E58B2A',
          accent: '#B67A2E',
          textMain: '#333333',
          textMuted: '#6B7280',
          border: '#E5E7EB',
          warningSoft: '#FFE8C2',
        },
      },
      fontFamily: {
        sans: ['"Avenir"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0px 10px 30px rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [],
};

