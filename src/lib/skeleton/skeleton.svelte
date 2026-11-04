<script lang="ts">
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";

  export type SkeletonProps = BoxProps;
  let {
    children,
    class: className,
    variant,
    shape = "xs",
    ...restProps
  }: SkeletonProps = $props();
</script>

<Box
  class={cn(
    "min-h-lh motion-safe:animate-pulse",
    !variant && "bg-m3-surface-container",
    className,
  )}
  {variant}
  {shape}
  {...restProps}
>
  {#if children}
    <div class="invisible">{@render children()}</div>
  {/if}
</Box>
