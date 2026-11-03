<script module lang="ts">
  import { Link, type LinkProps } from "#lib/link/index.js";
  import type { Snippet } from "svelte";
  import { cn } from "#lib/utils.js";

  type Crumb = {
    title: string;
    href: string;
  };

  export type BreadcrumbsProps = {
    path: Crumb[];
    separator?: Snippet | string;
  } & Omit<LinkProps, "children" | "href">;
</script>

<script lang="ts">
  const {
    path,
    separator = "›",
    class: className,
    ...restProps
  }: BreadcrumbsProps = $props();
</script>

<div class={cn("flex gap-2", className)}>
  {#each path as { title, href }, index (title)}
    {#if index !== 0}
      <div>
        {#if typeof separator === "function"}
          {@render separator()}
        {:else}
          {separator}
        {/if}
      </div>
    {/if}
    <Link {href} underline="hover" {...restProps}>{title}</Link>
  {/each}
</div>
