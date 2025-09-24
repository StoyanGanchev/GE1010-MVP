import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#E0F2FE',
          DEFAULT: '#0284C7',
          dark: '#0C4A6E'
        },
        accent: {
          light: '#DEFCE7',
          DEFAULT: '#16A34A',
          dark: '#065F46'
        }
      },
      fontFamily: {
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};

export default config;
