<script lang="ts">
  import type { ClassName } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type SliderHandleLabelArrowProps = {} & ClassName &
    HTMLAttributes<HTMLDivElement>;
  let { class: className, ...restProps }: SliderHandleLabelArrowProps =
    $props();
</script>

<div
  class={twMerge(
    "absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-m3-outline-variant",
    className,
  )}
  {...restProps}
></div>
