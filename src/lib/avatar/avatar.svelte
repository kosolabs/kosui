<script lang="ts" module>
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";

  export type AvatarProps = {
    src?: string;
    alt?: string;
  } & BoxProps;
</script>

<script lang="ts">
  let {
    src,
    alt,
    children,
    el = $bindable(),
    class: className,
    variant = "tonal",
    color = "secondary",
    shape = "rounded",
    centered = true,
    ...restProps
  }: AvatarProps = $props();

  let error: boolean = $state(false);
</script>

<Box
  bind:el
  {variant}
  {color}
  {shape}
  {centered}
  class={cn("aspect-square h-9 overflow-clip text-xl", className)}
  {...restProps}
>
  {#if src && !error}
    <img
      {src}
      {alt}
      onerror={() => (error = true)}
      referrerpolicy="no-referrer"
    />
  {:else}
    {@render children?.()}
  {/if}
</Box>
