<script module lang="ts">
  import { Box } from "#lib/box/index.js";
  import type { Shortcut } from "#lib/shortcut/index.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { HTMLInputAttributes, ClassValue } from "svelte/elements";

  export type ShortcutBadgeProps = {
    shortcut: Shortcut;
    badgeClass?: ClassValue;
  } & ElementRef &
    ClassName &
    HTMLInputAttributes;
</script>

<script lang="ts">
  let {
    shortcut,
    el = $bindable(),
    class: className,
    badgeClass,
  }: ShortcutBadgeProps = $props();
</script>

<div bind:this={el} class={cn("flex gap-1 text-m3-on-surface", className)}>
  {#each shortcut as symbol, index (index)}
    <Box
      variant="elevated"
      color="secondary"
      centered
      class={cn("h-5 min-w-5 rounded border p-1 text-xs", badgeClass)}
    >
      {symbol}
    </Box>
  {/each}
</div>
