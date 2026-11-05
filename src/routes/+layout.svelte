<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { Button, Drawer, NavGroup, NavItem } from "#lib/index.js";
  import { KosuiLogo } from "#ui";
  import { Menu, Moon, Sun } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import { on } from "svelte/events";
  import "../app.css";
  import GithubMark from "./github-mark.svelte";
  import { CATEGORIES, findPage, GUIDES } from "./nav.js";

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

  $effect(() =>
    on(matchMedia("(min-width: 48rem)"), "change", (event) => {
      if (event.matches) navOpen = false;
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

{#snippet navigation(inDrawer: boolean)}
  <nav aria-label="Docs" class="flex flex-col gap-0.5">
    {#each [{ name: "Overview", href: home }, ...GUIDES] as item (item.href)}
      <NavItem
        href={item.href}
        current={item.href === page.url.pathname}
        autofocus={inDrawer && item.href === page.url.pathname}
        size="sm"
      >
        {item.name}
      </NavItem>
    {/each}
    {#each CATEGORIES as category (category.name)}
      <NavGroup label={category.name}>
        {#each category.items as item (item.href)}
          <NavItem
            href={item.href}
            current={item.href === page.url.pathname}
            autofocus={inDrawer && item.href === page.url.pathname}
            size="sm"
          >
            {item.name}
          </NavItem>
        {/each}
      </NavGroup>
    {/each}
  </nav>
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
      icon={Menu}
      variant="plain"
      color="plain"
      class="md:hidden"
      aria-label="Navigation"
      aria-haspopup="dialog"
      aria-expanded={navOpen}
      onclick={() => (navOpen = true)}
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

  <div class="flex min-h-0 flex-1">
    <aside class="hidden w-60 shrink-0 overflow-y-auto border-r p-3 md:block">
      {@render navigation(false)}
    </aside>

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

<Drawer bind:open={navOpen} aria-label="Navigation">
  {@render navigation(true)}
</Drawer>
