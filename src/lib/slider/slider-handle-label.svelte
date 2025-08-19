<script lang="ts">
  import { getSliderContext } from "$lib/slider/index.js";
  import type { ClassName } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type SliderHandleLabelProps = {} & ClassName &
    HTMLAttributes<HTMLDivElement>;
  let { class: className, ...restProps }: SliderHandleLabelProps = $props();

  const ctx = getSliderContext();

  const showLabel = $derived(
    !ctx.disabled &&
      (ctx.labelAlwaysOn || ctx.isHovered || ctx.isDragging || ctx.isFocused),
  );
</script>

{#if showLabel}
  <div
    role="tooltip"
    class={twMerge(
      "pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-md border border-m3-outline-variant bg-m3-surface-container px-2 py-1 text-xs whitespace-nowrap text-m3-on-surface shadow-sm transition-opacity duration-200",
      className,
    )}
    {...restProps}
  >
    {ctx.label}
    {@render ctx.handleLabelArrowRenderer({})}
  </div>
{/if}
