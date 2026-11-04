<script lang="ts">
  import { baseClasses, type Variants } from "#lib/base.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type BoxProps = {
    children?: Snippet;
  } & ElementRef &
    ClassName &
    Variants &
    HTMLAttributes<HTMLDivElement>;
  let {
    children,
    el = $bindable(),
    class: className,
    variant,
    color,
    shape,
    ...restProps
  }: BoxProps = $props();
</script>

<div
  bind:this={el}
  class={cn(baseClasses({ variant, color, shape }), className)}
  {...restProps}
>
  {@render children?.()}
</div>
