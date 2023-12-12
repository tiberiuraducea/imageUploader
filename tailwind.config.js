import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      fill: {
        current: 'currentColor',
      },
      colors: {
        'current': 'currentColor',
        'dog-green': 'rgb( var(--dog-green) / <alpha-value>)',
        'alex-green': 'rgb( var(--alex-green) / <alpha-value>)',
        'stroke-green': 'rgb( var(--stroke-green) / <alpha-value>)',
        'red': 'rgb( var(--red) / <alpha-value>)',
        'alert-red': 'rgb( var(--alert-red) / <alpha-value>)',
        'orange': 'rgb( var(--orange) / <alpha-value>)',
        'yellow': 'rgb( var(--yellow) / <alpha-value>)',
        green: {
          1: 'rgb( var(--green-1) / <alpha-value>)',
          2: 'rgb( var(--green-2) / <alpha-value>)',
          3: 'rgb( var(--green-3) / <alpha-value>)',
        },
        blue: {
          1: 'rgb( var(--blue-1) / <alpha-value>)',
          2: 'rgb( var(--blue-2) / <alpha-value>)',
          3: 'rgb( var(--blue-3) / <alpha-value>)',
        },
        purple: {
          1: 'rgb( var(--purple-1) / <alpha-value>)',
          2: 'rgb( var(--purple-2) / <alpha-value>)',
        },
        gray: {
          1: 'rgb( var(--gray-1) / <alpha-value>)',
          2: 'rgb( var(--gray-2) / <alpha-value>)',
          3: 'rgb( var(--gray-3) / <alpha-value>)',
          4: 'rgb( var(--gray-4) / <alpha-value>)',
          5: 'rgb( var(--gray-5) / <alpha-value>)',
          6: 'rgb( var(--gray-6) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [forms],
}

