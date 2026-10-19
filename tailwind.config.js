/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0a',
        ink2: '#121210',
        ink3: '#181815',
        forest: '#14201b',
        paper: '#e9e6dd',
        cream: '#efeee9',
        amber: '#c8763c',
        'amber-soft': '#e2a66d',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Noto Serif SC"', '"Songti SC"', 'serif'],
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', '"Cascadia Code"', '"Noto Sans SC"', '"Microsoft YaHei"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.76, 0, 0.24, 1)',
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
