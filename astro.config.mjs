import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://hntrl.io/",
  integrations: [mdx(), icon(), react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "plastic",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
