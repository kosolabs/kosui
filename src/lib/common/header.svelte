<script module lang="ts">
  import { baseClasses, type Variants } from "#lib/base.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type HeaderProps = {
    children: Snippet;
  } & ElementRef &
    ClassName &
    Variants &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  let {
    children,
    el = $bindable(),
    class: className,
    variant = "plain",
    color = "primary",
    shape = "rounded",
    ...restProps
  }: HeaderProps = $props();
</script>

<div
  bind:this={el}
  class={cn(
    baseClasses({ variant, color, shape }),
    "px-2 py-1 text-xs uppercase",
    className,
  )}
  {...restProps}
>
  {@render children()}
</div>
