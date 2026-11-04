<script lang="ts" module>
  import type { Size, SizeProp } from "#lib/base.js";
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";
  import { X } from "@lucide/svelte";
  import type { Snippet } from "svelte";

  export type ChipProps = {
    title?: string;
    onClick?: (event: MouseEvent | KeyboardEvent) => void;
    onDelete?: (event: MouseEvent | KeyboardEvent) => void;
    children: Snippet;
  } & SizeProp &
    BoxProps;

  const LABEL_SIZES: Record<Size, string> = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-3.5 py-1.5 text-base",
    lg: "px-4 py-2 text-lg",
    xl: "px-5 py-2.5 text-xl",
  };
  const REMOVE_SIZES: Record<Size, [string, number]> = {
    xs: ["size-5", 12],
    sm: ["size-6", 14],
    md: ["size-7", 16],
    lg: ["size-8", 18],
    xl: ["size-9", 20],
  };
</script>

<script lang="ts">
  let {
    title,
    onClick,
    onDelete,
    children,
    el = $bindable(),
    class: className,
    variant = "filled",
    color = "primary",
    shape = "sm",
    size = "sm",
    ...restProps
  }: ChipProps = $props();

  const id = $props.id();
  let labelClasses = $derived(cn(LABEL_SIZES[size], onDelete && "pr-1"));
  let [removeSize, iconSize] = $derived(REMOVE_SIZES[size]);
  const focusRing =
    "rounded-[inherit] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary";

  function deleteOnKey(event: KeyboardEvent) {
    if (onDelete && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      onDelete(event);
    }
  }
</script>

<Box
  bind:el
  {variant}
  {color}
  {shape}
  class={cn("inline-flex items-center", className)}
  {...restProps}
>
  {#if onClick}
    <button
      type="button"
      id="{id}-label"
      class={cn(labelClasses, focusRing)}
      {title}
      onclick={onClick}
      onkeydown={deleteOnKey}
    >
      {@render children()}
    </button>
  {:else}
    <span id="{id}-label" class={labelClasses} {title}>
      {@render children()}
    </span>
  {/if}

  {#if onDelete}
    <button
      type="button"
      id="{id}-delete"
      aria-label="Remove"
      aria-labelledby="{id}-delete {id}-label"
      class={cn(
        "mr-0.5 inline-flex shrink-0 items-center justify-center rounded-full transition hover:bg-current/10",
        removeSize,
        focusRing,
        "rounded-full",
      )}
      onclick={onDelete}
      onkeydown={deleteOnKey}
    >
      <X size={iconSize} />
    </button>
  {/if}
</Box>
