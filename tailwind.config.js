/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chat: {
          bg: '#212121',
          surface: '#2f2f2f',
          border: '#404040',
          user: '#10a37f',
          assistant: '#565869',
          text: '#ececf1',
          textSecondary: '#8e8ea0',
        }
      }
    },
  },
  plugins: [],
}