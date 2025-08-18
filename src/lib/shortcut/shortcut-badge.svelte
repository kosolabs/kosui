<script module lang="ts">
  import { Box } from "$lib/box/index.js";
  import { type Shortcut } from "$lib/shortcut/index.js";
  import { noop, type ClassName, type ElementRef } from "$lib/utils.js";
  import { type HTMLInputAttributes } from "svelte/elements";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  export type ShortcutBadgeProps = {
    shortcut: Shortcut;
    badgeClass?: ClassNameValue;
  } & ElementRef &
    ClassName &
    HTMLInputAttributes;
</script>

<script lang="ts">
  let {
    shortcut,
    el = $bindable(),
    ref = noop,
    class: className,
    badgeClass,
  }: ShortcutBadgeProps = $props();
</script>

<div
  bind:this={el}
  use:ref
  class={twMerge("flex gap-1 text-m3-on-surface", className)}
>
  {#each shortcut as symbol, index (index)}
    <Box
      variant="elevated"
      color="secondary"
      centered
      class={twMerge("h-5 min-w-5 rounded border p-1 text-xs", badgeClass)}
    >
      {symbol}
    </Box>
  {/each}
</div>
