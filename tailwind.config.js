module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(255,255,0,0.25)',
        '4xl': [
            '0 35px 35px rgba(255,100,50,0.25)',
        ]
      }
    },
  },
  plugins: [],
}