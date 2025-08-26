<script lang="ts">
  import type { ClassName } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type SliderMarkLabelProps = {
    label?: string;
  } & ClassName &
    HTMLAttributes<HTMLDivElement>;
  let {
    label,
    class: className,
    ...restProps
  }: SliderMarkLabelProps = $props();
</script>

{#if label}
  <div
    class={twMerge(
      "absolute top-full mt-1 text-xs whitespace-nowrap text-m3-on-surface-variant",
      "left-1/2 -translate-x-1/2",
      className,
    )}
    {...restProps}
  >
    {label}
  </div>
{/if}
