/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fcfbf8',
        surface: '#f3eee5',
        'surface-elevated': '#ffffff',
        border: '#dcd4c5',
        'border-input': '#736c61',
        text: '#1a1917',
        'text-muted': '#575249',
        accent: {
          DEFAULT: '#9c4826',
          hover: '#873c1d',
          light: '#f7ede7',
        },
        'on-accent': '#ffffff',
        danger: '#b82b2b',
        success: '#1b693e',
      },
      fontFamily: {
        serif: [
          'var(--font-serif)',
          '"Playfair Display"',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          'var(--font-sans)',
          '"Plus Jakarta Sans"',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(36, 30, 24, 0.05), 0 4px 12px rgba(36, 30, 24, 0.04)',
        pop: '0 16px 36px rgba(36, 30, 24, 0.12)',
      },
    },
  },
  plugins: [],
};
