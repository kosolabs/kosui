<script lang="ts">
  import { Box, type BoxProps } from "$lib/box/index.js";
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  export type SkeletonProps = { children?: Snippet } & BoxProps;
  let {
    children,
    class: className,
    backdrop = true,
    shape = "rounded",
    ...restProps
  }: SkeletonProps = $props();
</script>

<Box
  class={twMerge("animate-pulse", className)}
  {backdrop}
  {shape}
  {...restProps}
>
  {@render children?.()}
</Box>
