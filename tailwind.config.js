module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['font-marcellus'],
  theme: {
    extend: {
      fontFamily: {
        optima: ['var(--font-marcellus)'],
      },
    },
  },
  plugins: [],
}
