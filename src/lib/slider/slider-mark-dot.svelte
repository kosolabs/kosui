<script lang="ts">
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { getSliderContext } from "./index.js";

  export type SliderMarkDotProps = {} & ClassName &
    HTMLAttributes<HTMLDivElement>;
  let { class: className, ...restProps }: SliderMarkDotProps = $props();
  const ctx = getSliderContext();
</script>

<div
  class={cn(
    "rounded-full bg-m3-surface-container-lowest",

    ctx.size === "sm" && "size-0.5",
    ctx.size === "md" && "size-1",
    ctx.size === "lg" && "size-1.5",
    ctx.size === "xl" && "size-2",

    className,
  )}
  {...restProps}
></div>
