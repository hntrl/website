/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["eslint-plugin-import-helpers"],
  rules: {
    "react/no-unescaped-entities": 0,
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always", // new line between groups
        groups: [
          "/server-only/",
          ["/react/", "/next/"],
          "module",
          "/~/components/",
          "/~//",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "desc", ignoreCase: true },
      },
    ],
  },
};
