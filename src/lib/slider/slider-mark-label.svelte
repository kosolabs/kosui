<script lang="ts">
  import { mergeProps } from "$lib/merge-props.js";
  import type { ClassName } from "$lib/utils.js";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  import { getSliderContext } from "./slider-context.svelte.js";

  export type SliderMarkLabelProps = {
    value: number;
    label?: string;
  } & ClassName &
    HTMLButtonAttributes;
  let {
    value,
    label,
    class: className,
    ...restProps
  }: SliderMarkLabelProps = $props();

  const ctx = getSliderContext();
</script>

{#if label}
  <button
    class={twMerge(
      "absolute top-full mt-2 text-xs whitespace-nowrap text-m3-on-surface-variant",
      "left-1/2 -translate-x-1/2",
      className,
    )}
    {...mergeProps(restProps, {
      onpointerdown: (e: PointerEvent) => e.stopImmediatePropagation(),
      onclick: () => (ctx.value = value),
    })}
  >
    {label}
  </button>
{/if}
