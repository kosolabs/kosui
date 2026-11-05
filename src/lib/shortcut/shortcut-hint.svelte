<script module lang="ts">
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Shortcut } from "./shortcut.js";

  export type ShortcutHintProps = {
    shortcut: Shortcut;
  } & ElementRef &
    ClassName &
    HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
  let {
    shortcut,
    el = $bindable(),
    class: className,
    ...restProps
  }: ShortcutHintProps = $props();
</script>

<kbd
  bind:this={el}
  class={cn("inline-flex shrink-0 gap-1 font-sans text-xs", className)}
  {...restProps}
>
  <span class="sr-only">{shortcut}</span>
  {#each shortcut.keys() as key, index (index)}
    <kbd
      aria-hidden="true"
      class="inline-flex h-[1.75em] min-w-[1.75em] items-center justify-center rounded border border-b-2 border-m3-outline-variant bg-m3-surface-container-low px-[0.4em] text-m3-on-surface-variant"
    >
      {key}
    </kbd>
  {/each}
</kbd>
