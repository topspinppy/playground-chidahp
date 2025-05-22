/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // ✅ ให้ Tailwind รู้ว่าจะแสกนไฟล์ไหน
  ],
  theme: {
    extend: {
      // 🔥 Custom prose style สำหรับชี้ดาบ (optional)
      typography: (theme) => ({
        yellow: {
          css: {
            color: theme('colors.yellow.300'),
            a: { color: theme('colors.yellow.400'), textDecoration: 'underline' },
            h1: { color: theme('colors.yellow.400') },
            h2: { color: theme('colors.yellow.400') },
            'ul > li::marker': { color: theme('colors.yellow.500') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
