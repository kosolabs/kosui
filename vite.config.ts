import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 5175,
  },
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
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
