<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button, Link } from "#lib/index.js";
  import { CodeBlock, KosuiLogo } from "#ui";
  import { ArrowRight } from "@lucide/svelte";
  import { CATEGORIES } from "./nav.js";
  import Showcase from "./showcase.svelte";

  const PRINCIPLES = [
    [
      "Svelte first",
      "Runes, snippets and attachments, the way Svelte 5 intends.",
    ],
    [
      "Accessible by default",
      "Roles, keyboard support and focus management are built in.",
    ],
    [
      "Convention over invention",
      "Components behave the way every platform's do.",
    ],
    [
      "Shared vocabulary",
      "variant, color, shape and size mean the same thing everywhere.",
    ],
    [
      "Transparent props",
      "Components pass attributes through to the element they render.",
    ],
    [
      "Minimal dependencies",
      "Svelte, Tailwind CSS, marked and Lucide icons. That's it.",
    ],
  ];

  const INSTALL = "pnpm add kosui";
  const CSS = `@import "tailwindcss";
@import "kosui/theme.css";`;
  const USAGE = `<script lang="ts">
  import { Button } from "kosui";
</${"script"}>

<Button variant="filled">Save</Button>`;
  const THEME = `:root {
  --md-sys-color-primary: rgb(68 94 145);
  --md-sys-color-on-primary: rgb(255 255 255);
  /* … */
}

.dark {
  --md-sys-color-primary: rgb(173 198 255);
  /* … */
}`;
</script>

{#snippet code(source: string)}
  <div class="rounded-md border bg-m3-surface-container p-4 text-sm">
    <CodeBlock code={source} />
  </div>
{/snippet}

<div class="mx-auto flex w-full max-w-5xl flex-col gap-20 pb-12">
  <section
    class="grid items-center gap-10 pt-6 lg:grid-cols-[1fr_auto]"
    aria-labelledby="title"
  >
    <div class="flex flex-col items-start gap-6">
      <KosuiLogo class="text-4xl" alt="" />
      <h1 id="title" class="text-5xl font-light tracking-tight md:text-6xl">
        Kosui
      </h1>
      <p class="max-w-xl text-xl text-m3-on-surface-variant">
        Accessible Svelte 5 components, styled with Material 3 and Tailwind CSS.
        Built for web apps, with live examples of every component.
      </p>
      <div class="flex flex-wrap gap-3">
        <Button variant="filled" size="md" href="#getting-started">
          Get started
        </Button>
        <Button variant="outlined" size="md" href="#components">
          Browse components
        </Button>
      </div>
    </div>
    <Showcase />
  </section>

  <section class="flex flex-col gap-6" aria-labelledby="principles">
    <div class="flex flex-col gap-2">
      <h2 id="principles" class="text-3xl font-light">Principles</h2>
      <p class="max-w-prose text-m3-on-surface-variant">
        A few rules decide how every component behaves. Read them all in the
        <Link href={resolve("/design-language")}>design language</Link>.
      </p>
    </div>
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each PRINCIPLES as [name, description] (name)}
        <li
          class="flex flex-col gap-1 rounded-xl bg-m3-surface-container-low p-5"
        >
          <h3 class="font-medium">{name}</h3>
          <p class="text-sm text-m3-on-surface-variant">{description}</p>
        </li>
      {/each}
    </ul>
  </section>

  <section class="flex flex-col gap-8" aria-labelledby="components">
    <h2 id="components" class="scroll-mt-6 text-3xl font-light">Components</h2>
    {#each CATEGORIES as category (category.name)}
      <div class="flex flex-col gap-3">
        <h3
          class="text-xs font-medium tracking-wide text-m3-on-surface-variant uppercase"
        >
          {category.name}
        </h3>
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {#each category.items as item (item.href)}
            <li>
              <!-- eslint-disable svelte/no-navigation-without-resolve -->
              <a
                href={item.href}
                class="group flex h-full items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-m3-surface-container-low focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary"
              >
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-m3-secondary-container text-m3-on-secondary-container"
                >
                  <item.icon size={18} />
                </span>
                <span class="flex flex-col gap-0.5">
                  <span class="flex items-center gap-1 font-medium">
                    {item.name}
                    <ArrowRight
                      size={14}
                      class="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span class="text-sm text-m3-on-surface-variant">
                    {item.description}
                  </span>
                </span>
              </a>
              <!-- eslint-enable svelte/no-navigation-without-resolve -->
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section class="flex flex-col gap-6" aria-labelledby="getting-started">
    <h2 id="getting-started" class="scroll-mt-6 text-3xl font-light">
      Getting started
    </h2>
    <ol class="flex max-w-3xl flex-col gap-8">
      <li class="flex flex-col gap-3">
        <h3 class="text-lg">1. Install</h3>
        <p class="text-m3-on-surface-variant">
          Kosui needs Svelte 5 and Tailwind CSS 4.
        </p>
        {@render code(INSTALL)}
      </li>
      <li class="flex flex-col gap-3">
        <h3 class="text-lg">2. Add the theme</h3>
        <p class="text-m3-on-surface-variant">
          Import Kosui's theme after Tailwind in your app's CSS. It adds the
          Material 3 colors as utilities like <code>bg-m3-primary</code>, a
          default palette, and tells Tailwind to scan Kosui's components.
        </p>
        {@render code(CSS)}
      </li>
      <li class="flex flex-col gap-3">
        <h3 class="text-lg">3. Use components</h3>
        {@render code(USAGE)}
      </li>
      <li class="flex flex-col gap-3">
        <h3 class="text-lg">4. Make it yours</h3>
        <p class="text-m3-on-surface-variant">
          Override the <code>--md-sys-color-*</code> variables with a palette
          from the
          <Link
            href="https://material-foundation.github.io/material-theme-builder/"
          >
            Material Theme Builder</Link
          >. Add the <code>dark</code> class to <code>&lt;html&gt;</code> for the
          dark palette.
        </p>
        {@render code(THEME)}
      </li>
    </ol>
  </section>
</div>
