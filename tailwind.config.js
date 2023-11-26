/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'dog-green': 'var(--dog-green)',
        'stroke-green': 'var(--stroke-green)',
        gray: {
          5: 'var(--gray-5)',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

