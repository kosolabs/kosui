import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * @param {string} layerName
 * @see https://github.com/sveltejs/svelte/issues/11345
 */
function cssLayer(layerName) {
  return {
    name: "svelte-css-layer",
    style: ({ content }) => {
      return {
        code: `@layer ${layerName} { ${content} }`,
      };
    },
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), cssLayer("components")],

  kit: {
    adapter: adapter({
      precompress: true,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
    },
    alias: {
      $ui: "src/ui/index.ts",
      "$ui/*": "src/ui/*",
    },
  },
  compilerOptions: {
    runes: true,
  },
};

export default config;
