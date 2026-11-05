<script module lang="ts">
  import {
    baseClasses,
    type ShapeProp,
    type Size,
    type SizeProp,
  } from "#lib/base.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { LucideIcon } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  export type NavItemProps = {
    href: string;
    current?: boolean;
    icon?: LucideIcon;
    children: Snippet;
  } & ElementRef &
    ClassName &
    ShapeProp &
    SizeProp &
    Omit<HTMLAnchorAttributes, "href">;

  const SIZES: Record<Size, string> = {
    xs: "h-7 gap-2 px-3 text-xs",
    sm: "h-9 gap-3 px-4 text-sm",
    md: "h-11 gap-3 px-4 text-sm",
    lg: "h-13 gap-3 px-4 text-base",
    xl: "h-15 gap-4 px-5 text-base",
  };
</script>

<script lang="ts">
  let {
    href,
    current = false,
    icon: Icon,
    children,
    el = $bindable(),
    class: className,
    shape = "full",
    size = "md",
    ...restProps
  }: NavItemProps = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
  bind:this={el}
  {href}
  aria-current={current ? "page" : undefined}
  class={cn(
    baseClasses({ shape }),
    SIZES[size],
    "flex shrink-0 items-center text-m3-on-surface-variant hover:bg-m3-on-surface/8 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary aria-[current=page]:bg-m3-secondary-container aria-[current=page]:font-medium aria-[current=page]:text-m3-on-secondary-container",
    className,
  )}
  {...restProps}
>
  {#if Icon}
    <Icon class="size-[1.25em] shrink-0" />
  {/if}
  {@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
