import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(135deg, #f8e2e2, #f0f4f8, #f8f8e2)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
      colors: {
        'gradient-start': '#f8e2e8', // light pink
        'gradient-middle1': '#f0f4f8', // light blue
        'gradient-middle2': '#e2f8e2', // light green
        'gradient-end': '#f8f8e2', // light yellow
      },
    },
  },
  plugins: [],
};
export default config;
