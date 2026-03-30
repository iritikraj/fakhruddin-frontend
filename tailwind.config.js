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
        heading: ['var(--font-faculty)', 'Faculty Glyphic', 'Georgia', 'serif'],        
        body: ['var(--font-seitu)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],

        optima: ['var(--font-marcellus)'],
      },
    },
  },
  plugins: [],
}
