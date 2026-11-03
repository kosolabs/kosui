<script lang="ts">
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { getSliderContext } from "./index.js";

  export type SliderMarkProps = {
    value: number;
    label?: string;
  } & ClassName &
    HTMLAttributes<HTMLDivElement>;

  let {
    value,
    label,
    class: className,
    ...restProps
  }: SliderMarkProps = $props();

  const ctx = getSliderContext();
</script>

<div
  class={cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2", className)}
  style={`left: ${ctx.getPositionFromValue(value)}%`}
  {...restProps}
>
  {@render ctx.markDotRenderer({})}
  {@render ctx.markLabelRenderer({ value, label })}
</div>
