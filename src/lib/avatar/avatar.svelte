<script lang="ts" module>
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";

  export type AvatarProps = {
    src?: string;
    alt?: string;
  } & Omit<BoxProps, "centered" | "backdrop">;
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
    ...restProps
  }: AvatarProps = $props();

  let failedSrc: string | undefined = $state();
</script>

<Box
  bind:el
  role={alt ? "img" : undefined}
  aria-label={alt || undefined}
  {variant}
  {color}
  {shape}
  centered
  class={cn("@container aspect-square h-9 overflow-clip", className)}
  {...restProps}
>
  {#if src && src !== failedSrc}
    <img
      class="size-full object-cover"
      {src}
      alt=""
      onerror={() => (failedSrc = src)}
      referrerpolicy="no-referrer"
    />
  {:else}
    <span class="contents text-[50cqw] leading-none">
      {@render children?.()}
    </span>
  {/if}
</Box>
