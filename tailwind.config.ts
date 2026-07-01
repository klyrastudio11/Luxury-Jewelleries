import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7efe6',
        champagne: '#d8b46a',
        sand: '#c7a777',
        charcoal: '#121212',
        ivory: '#fcf8f2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 20px 60px rgba(18,18,18,0.14)',
      },
    },
  },
  plugins: [],
} satisfies Config;
