<script module lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { toTitleCase, type ClassName } from "../utils";

  type Crumb = {
    path: string;
    title: string;
  };

  type BreadcrumbsProps = {
    separator?: Snippet | string;
  } & ClassName;
</script>

<script lang="ts">
  import { Goto } from "../goto";

  const { separator = "›", class: className }: BreadcrumbsProps = $props();

  let crumbs = $derived.by(() => {
    const parts = page.url.pathname.split("/");
    const crumbs: Crumb[] = [{ path: "/", title: "Home" }];
    for (let i = 1; i < parts.length; i++) {
      crumbs.push({
        path: parts.slice(0, i + 1).join("/"),
        title: toTitleCase(parts[i]),
      });
    }
    return crumbs;
  });
</script>

<div class={twMerge("flex gap-2", className)}>
  {#each crumbs as { path, title }, index (title)}
    {#if index !== 0}
      <div>
        {#if typeof separator === "function"}
          {@render separator()}
        {:else}
          {separator}
        {/if}
      </div>
    {/if}
    <Goto href={path} color="inherit">{title}</Goto>
  {/each}
</div>
