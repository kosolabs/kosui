<script module lang="ts">
  import { baseClasses, type Variants } from "#lib/base.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type HeaderProps = {
    children: Snippet;
  } & ClassName &
    Variants &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  let {
    children,
    class: className,
    variant = "plain",
    color = "primary",
    shape = "rounded",
    ...restProps
  }: HeaderProps = $props();
</script>

<div
  class={cn(
    baseClasses({ variant, color, shape }),
    "px-2 py-1 text-xs uppercase",
    className,
  )}
  {...restProps}
>
  {@render children()}
</div>
