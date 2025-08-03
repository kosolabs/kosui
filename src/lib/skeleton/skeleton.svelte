<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Box, type BoxProps } from "../box";

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
