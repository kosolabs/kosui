<script lang="ts">
  import { baseClasses, type Variants } from "#lib/base.js";
  import { cn, noop, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type BoxProps = {
    centered?: boolean;
    backdrop?: boolean;
    children?: Snippet;
  } & ElementRef &
    ClassName &
    Variants &
    HTMLAttributes<HTMLDivElement>;
  let {
    backdrop = false,
    centered = false,
    children,
    el = $bindable(),
    ref = noop,
    class: className,
    variant,
    color,
    shape,
    ...restProps
  }: BoxProps = $props();
</script>

<div
  bind:this={el}
  use:ref
  class={cn(
    backdrop && "bg-m3-surface-container",
    baseClasses({ variant, color, shape }),
    centered && "flex items-center justify-center",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
