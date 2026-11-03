import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import type { PreprocessorGroup } from "svelte/compiler";
import tailwindcss from "@tailwindcss/vite";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "vitest/config";

/** @see https://github.com/sveltejs/svelte/issues/11345 */
function cssLayer(layerName: string): PreprocessorGroup {
  return {
    name: "svelte-css-layer",
    style: ({ content }) => {
      return { code: `@layer ${layerName} { ${content} }` };
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      preprocess: [vitePreprocess(), cssLayer("components")],
      compilerOptions: { runes: true },
      adapter: adapter({ precompress: true }),
      paths: {
        base: process.argv.includes("dev")
          ? ""
          : (process.env.BASE_PATH as `/${string}` | undefined),
      },
    }),
  ],
  server: { port: 5175 },
  test: {
    projects: [
      {
        test: {
          name: "server",
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          execArgv: [
            "--localstorage-file",
            path.resolve(os.tmpdir(), `vitest-${process.pid}.localstorage`),
          ],
        },
      },
    ],
  },
});
