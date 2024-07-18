/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grayscale: {
        // 0: 'var(--grayscale-00)',
        // 40: 'var(--grayscale-40)',
        // 60: 'var(--grayscale-60)',
        // 80: 'var(--grayscale-80)',
        // 100: 'var(--grayscale-100)'
        5: 'var(--grayscale-5)',
        25: 'var(--grayscale-25)',
        90: 'var(--grayscale-90)'
      },
      green: {
        20: 'var(--green-20)',
        50: 'var(--green-50)',
        80: 'var(--green-80)'
      },
      pink: {
        10: 'var(--pink-10)',
        40: 'var(--pink-40)',
        50: 'var(--pink-50)'
      },
      yellow: {
        light: 'var(--yellow-light)',
        dark: 'var(--yellow-dark)'
      },
      blue: {
        light: 'var(--blue-light)',
        dark: 'var(--blue-dark)'
      },
      orange: {
        light: 'var(--orange-light)',
        dark: 'var(--orange-dark)'
      }
    },
    extend: {}
  },
  plugins: []
};
