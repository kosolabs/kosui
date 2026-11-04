<script lang="ts" module>
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";
  import { X } from "@lucide/svelte";
  import type { Snippet } from "svelte";

  export type ChipProps = {
    title?: string;
    onClick?: (event: MouseEvent | KeyboardEvent) => void;
    onDelete?: (event: MouseEvent | KeyboardEvent) => void;
    children: Snippet;
  } & Omit<BoxProps, "centered" | "backdrop">;
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
    shape = "rounded",
    ...restProps
  }: ChipProps = $props();

  const id = $props.id();
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
  class={cn("inline-flex items-center text-sm", className)}
  {...restProps}
>
  {#if onClick}
    <button
      type="button"
      id="{id}-label"
      class={cn("px-3 py-1", onDelete && "pr-1", focusRing)}
      {title}
      onclick={onClick}
      onkeydown={deleteOnKey}
    >
      {@render children()}
    </button>
  {:else}
    <span id="{id}-label" class={cn("px-3 py-1", onDelete && "pr-1")} {title}>
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
        "mr-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full transition hover:bg-current/10",
        focusRing,
        "rounded-full",
      )}
      onclick={onDelete}
      onkeydown={deleteOnKey}
    >
      <X size={14} />
    </button>
  {/if}
</Box>
