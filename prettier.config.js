/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  semi: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 120,
  tabWidth: 4,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
