/** Tailwind CSS v4 runs through its PostCSS plugin; autoprefixer is retained per STEP 3. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;
