<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { Button, cn } from "#lib/index.js";
  import { KosuiLogo } from "#ui";
  import { Menu, Moon, Sun, X } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import { on } from "svelte/events";
  import "../app.css";
  import GithubMark from "./github-mark.svelte";
  import { CATEGORIES, findPage, GUIDES, type NavItem } from "./nav.js";

  const { children }: { children: Snippet } = $props();

  const THEME_KEY = "theme";
  const home = resolve("/");

  let dark = $state(document.documentElement.classList.contains("dark"));
  let navOpen = $state(false);

  const current = $derived(findPage(page.url.pathname));

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  }

  function toggleTheme() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      return;
    }
  }

  $effect(() =>
    on(matchMedia("(prefers-color-scheme: dark)"), "change", (event) => {
      if (storedTheme()) return;
      dark = event.matches;
      document.documentElement.classList.toggle("dark", dark);
    }),
  );

  afterNavigate(() => (navOpen = false));
</script>

<svelte:head>
  <title>{current ? `${current.name} · Kosui` : "Kosui"}</title>
  <meta
    name="description"
    content={current?.description ??
      "Accessible Svelte 5 components styled with Material 3 and Tailwind CSS."}
  />
</svelte:head>

<svelte:window
  onkeydown={(event) => {
    if (navOpen && event.key === "Escape") navOpen = false;
  }}
/>

{#snippet navLink({ name, href }: Pick<NavItem, "name" | "href">)}
  <!-- eslint-disable svelte/no-navigation-without-resolve -->
  <a
    {href}
    aria-current={href === page.url.pathname ? "page" : undefined}
    class="flex h-8 shrink-0 items-center rounded-full px-4 text-sm text-m3-on-surface-variant hover:bg-m3-on-surface/8 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary aria-[current=page]:bg-m3-secondary-container aria-[current=page]:font-medium aria-[current=page]:text-m3-on-secondary-container"
  >
    {name}
  </a>
  <!-- eslint-enable svelte/no-navigation-without-resolve -->
{/snippet}

<a
  href="#main"
  class="sr-only z-50 rounded-md bg-m3-primary px-4 py-2 text-m3-on-primary focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
  Skip to content
</a>

<div class="flex h-dvh flex-col">
  <header class="flex items-center gap-2 border-b px-4 py-2">
    <Button
      icon={navOpen ? X : Menu}
      variant="plain"
      color="plain"
      class="md:hidden"
      aria-label="Navigation"
      aria-expanded={navOpen}
      aria-controls="nav"
      onclick={() => (navOpen = !navOpen)}
    />
    <a
      href={home}
      class="flex items-center gap-2 rounded-md text-2xl font-light focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary"
    >
      <KosuiLogo />
      Kosui
    </a>
    <div class="ml-auto flex items-center gap-1">
      <Button
        href="https://github.com/kosolabs/kosui"
        variant="plain"
        color="plain"
        aria-label="GitHub"
        class="size-9 px-0"
      >
        <GithubMark class="size-5" />
      </Button>
      <Button
        icon={dark ? Sun : Moon}
        variant="plain"
        color="plain"
        tooltip="Dark theme"
        aria-pressed={dark}
        onclick={toggleTheme}
      />
    </div>
  </header>

  <div class="relative flex min-h-0 flex-1">
    <nav
      id="nav"
      aria-label="Docs"
      class={cn(
        "w-60 shrink-0 flex-col gap-0.5 overflow-y-auto border-r p-3 md:flex",
        navOpen ? "absolute inset-0 z-20 flex w-auto bg-m3-surface" : "hidden",
      )}
    >
      {@render navLink({ name: "Overview", href: home })}
      {#each GUIDES as item (item.href)}
        {@render navLink(item)}
      {/each}
      {#each CATEGORIES as category (category.name)}
        <h2
          class="mt-4 px-4 pb-1 text-xs font-medium tracking-wide text-m3-on-surface-variant uppercase"
        >
          {category.name}
        </h2>
        <ul class="flex flex-col gap-0.5">
          {#each category.items as item (item.href)}
            <li>{@render navLink(item)}</li>
          {/each}
        </ul>
      {/each}
    </nav>

    <main
      id="main"
      class="flex flex-1 flex-col gap-4 overflow-y-auto p-6 md:p-8"
    >
      {#if current}
        <h1 class="text-4xl font-light">{current.name}</h1>
      {/if}
      {@render children()}
    </main>
  </div>
</div>
