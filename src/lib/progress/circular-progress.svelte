<script lang="ts" module>
  import {
    baseClasses,
    type ColorProp,
    type Size,
    type SizeProp,
  } from "#lib/base.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { SVGAttributes } from "svelte/elements";

  export type CircularProgressProps = {
    progress?: number;
    children?: Snippet;
    el?: SVGSVGElement;
  } & ColorProp &
    SizeProp &
    ClassName &
    Omit<SVGAttributes<SVGSVGElement>, "children" | "class" | "color">;

  const SIZES: Record<Size, string> = {
    xs: "size-4",
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
    xl: "size-12",
  };
  const CIRCUMFERENCE = 2 * Math.PI * 10;
</script>

<script lang="ts">
  let {
    progress,
    children,
    el = $bindable(),
    color = "primary",
    size = "sm",
    class: className,
    "aria-label": ariaLabel = "Loading",
    ...restProps
  }: CircularProgressProps = $props();

  let fraction = $derived(
    progress === undefined ? undefined : Math.min(Math.max(progress, 0), 1),
  );
</script>

<svg
  bind:this={el}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="transparent"
  role="progressbar"
  aria-label={ariaLabel}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={fraction === undefined
    ? undefined
    : Math.round(fraction * 100)}
  class={cn("shrink-0", SIZES[size], baseClasses({ color }), className)}
  class:spin={fraction === undefined}
  {...restProps}
>
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="color-mix(in srgb, currentColor 10%, transparent)"
    stroke-width="2"
  />
  <circle
    class={[fraction === undefined && "dash"]}
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-dasharray={CIRCUMFERENCE}
    stroke-dashoffset={(1 - (fraction ?? 1)) * CIRCUMFERENCE}
    transform-origin="center"
    transform="rotate(-90)"
  />
  <text
    x="12"
    y="12"
    font-size="7"
    text-anchor="middle"
    dominant-baseline="central"
    fill="currentColor"
  >
    {@render children?.()}
  </text>
</svg>

<style>
  .spin {
    animation: rotate 2s linear infinite;
  }

  .dash {
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -62;
    }
  }
</style>
