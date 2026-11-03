<script module lang="ts">
  import {
    baseClasses,
    type ColorProp,
    type UnderlineProp,
  } from "#lib/base.js";
  import { cn, noop, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  export type LinkProps = {
    href: string;
    children: Snippet;
  } & ElementRef &
    ClassName &
    ColorProp &
    UnderlineProp &
    Omit<HTMLAnchorAttributes, "href">;
</script>

<script lang="ts">
  let {
    href,
    children,
    el = $bindable(),
    ref = noop,
    class: className,
    color = "primary",
    underline = "always",
    ...props
  }: LinkProps = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
  bind:this={el}
  use:ref
  {href}
  class={cn(
    baseClasses({
      variant: "text",
      color,
      shape: "rounded",
      underline,
      hover: true,
      focus: true,
    }),
    className,
  )}
  {...props}
>
  {@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
