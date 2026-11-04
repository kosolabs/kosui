<script module lang="ts">
  import type { ColorProp } from "#lib/base.js";
  import { Link } from "#lib/link/index.js";
  import { type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type Crumb = {
    title: string;
    href: string;
  };

  export type BreadcrumbsProps = {
    path: Crumb[];
    separator?: Snippet | string;
  } & ColorProp &
    ElementRef &
    ClassName &
    HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
  let {
    path,
    separator = "›",
    color = "primary",
    el = $bindable(),
    "aria-label": ariaLabel = "Breadcrumb",
    ...restProps
  }: BreadcrumbsProps = $props();
</script>

<nav bind:this={el} aria-label={ariaLabel} {...restProps}>
  <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
    {#each path as { title, href }, index (index)}
      {@const current = index === path.length - 1}
      <li class="flex items-center gap-2">
        {#if index !== 0}
          <span aria-hidden="true">
            {#if typeof separator === "function"}
              {@render separator()}
            {:else}
              {separator}
            {/if}
          </span>
        {/if}
        <Link
          {href}
          underline="hover"
          color={current ? "inherit" : color}
          aria-current={current ? "page" : undefined}
        >
          {title}
        </Link>
      </li>
    {/each}
  </ol>
</nav>
