<script lang="ts" module>
  import { baseClasses } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { getSliderContext } from "#lib/slider/index.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  export type SliderHandleProps = {} & ClassName &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  let { class: className, ...restProps }: SliderHandleProps = $props();

  const ctx = getSliderContext();
</script>

<div class="relative">
  <div
    class={cn(
      "border-2 border-m3-surface shadow-md",

      ctx.animated && "transition-all",
      !ctx.disabled && "hover:scale-110 focus:scale-110 active:scale-110",

      ctx.color === "primary" && "bg-m3-primary",
      ctx.color === "secondary" && "bg-m3-secondary",
      ctx.color === "tertiary" && "bg-m3-tertiary",
      ctx.color === "error" && "bg-m3-error",

      ctx.size === "xs" && "size-3",
      ctx.size === "sm" && "size-4",
      ctx.size === "md" && "size-5",
      ctx.size === "lg" && "size-6",
      ctx.size === "xl" && "size-7",

      baseClasses({ shape: ctx.shape }),

      className,
    )}
    {...mergeProps(restProps, {
      onpointerenter: () => (ctx.hovered = true),
      onpointerleave: () => (ctx.hovered = false),
    })}
  ></div>

  {@render ctx.handleLabelRenderer({})}
</div>
