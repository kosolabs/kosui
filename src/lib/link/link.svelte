<script module lang="ts">
  import { baseClasses, type Variants } from "#lib/base.js";
  import { cn, noop, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  export type LinkProps = {
    href: string;
    children: Snippet;
  } & ElementRef &
    ClassName &
    Variants &
    Omit<HTMLAnchorAttributes, "href">;
</script>

<script lang="ts">
  let {
    href,
    children,
    el = $bindable(),
    ref = noop,
    class: className,
    variant = "text",
    color = "primary",
    shape = "rounded",
    underline,
    ...props
  }: LinkProps = $props();

  let resolvedUnderline = $derived(
    underline ?? (variant === "text" ? "always" : "none"),
  );
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
  bind:this={el}
  use:ref
  {href}
  class={cn(
    baseClasses({
      variant,
      color,
      shape,
      underline: resolvedUnderline,
      hover: true,
      focus: true,
    }),
    variant !== "text" &&
      "inline-flex h-9 items-center justify-center gap-2 text-nowrap transition-all active:scale-95",
    className,
  )}
  {...props}
>
  {@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
