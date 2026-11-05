import { toMarkdown, type ComponentDocs } from "#ui";
import { CATEGORIES, GUIDES, type NavItem } from "./nav.js";

export const SITE = "https://kosui.kosolabs.com";

export const SUMMARY =
  "Accessible Svelte 5 components, styled with Material 3 and Tailwind CSS.";

export const SETUP = {
  install: "pnpm add kosui",
  css: `@import "tailwindcss";
@import "kosui/theme.css";`,
  usage: `<script lang="ts">
  import { Button } from "kosui";
</${"script"}>

<Button variant="filled">Save</Button>`,
  theme: `:root {
  --md-sys-color-primary: rgb(68 94 145);
  --md-sys-color-on-primary: rgb(255 255 255);
  /* … */
}

.dark {
  --md-sys-color-primary: rgb(173 198 255);
  /* … */
}`,
};

type DocsModule = { docs?: ComponentDocs; markdown?: string };

const modules = import.meta.glob<DocsModule>("./*/docs.ts", { eager: true });

export function slugOf(item: NavItem): string {
  return item.href.split("/").at(-1)!;
}

function moduleFor(item: NavItem): DocsModule | undefined {
  return modules[`./${slugOf(item)}/docs.ts`];
}

export const DOCUMENTED = [
  ...GUIDES,
  ...CATEGORIES.flatMap((category) => category.items),
].filter((item) => moduleFor(item));

export function pageMarkdown(item: NavItem): string {
  const module = moduleFor(item)!;
  const body = module.docs
    ? toMarkdown(item.name, item.description, module.docs)
    : [`# ${item.name}`, `> ${item.description}`, module.markdown].join("\n\n");
  return body.replaceAll(/\]\(\/([a-z-]+)\)/g, `](${SITE}/$1.md)`);
}

export function setupMarkdown(): string {
  return [
    "## Getting started",
    "Kosui needs Svelte 5 and Tailwind CSS 4.",
    "```sh\n" + SETUP.install + "\n```",
    "Import Kosui's theme after Tailwind in your app's CSS. It adds the Material 3 colors as utilities like `bg-m3-primary`, a default palette, and tells Tailwind to scan Kosui's components.",
    "```css\n" + SETUP.css + "\n```",
    "```svelte\n" + SETUP.usage + "\n```",
    "Override the `--md-sys-color-*` variables to use your own palette, and add the `dark` class to `<html>` for the dark one.",
  ].join("\n\n");
}

export function markdownResponse(body: string): Response {
  return new Response(body + "\n", {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
