/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#F9FAFB',
        bg: '#F9FAFB',
        text: '#1E40AF',
        'text-secondary': '#374151',
        "bg-secondary": '#E5E7EB',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

