<script lang="ts">
  import { Box, type BoxProps } from "#lib/box/index.js";
  import type { Snippet } from "svelte";
  import { cn } from "#lib/utils.js";

  export type SkeletonProps = { children?: Snippet } & BoxProps;
  let {
    children,
    class: className,
    variant,
    shape = "rounded",
    ...restProps
  }: SkeletonProps = $props();
</script>

<Box
  class={cn("animate-pulse", !variant && "bg-m3-surface-container", className)}
  {variant}
  {shape}
  {...restProps}
>
  {@render children?.()}
</Box>
