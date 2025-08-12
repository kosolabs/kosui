<script module lang="ts">
  import {
    COLORS,
    RADII,
    SIZES,
    type Color,
    type ColorProp,
    type Radius,
    type RadiusProp,
    type Size,
    type SizeProp,
  } from "$lib";
  import { type ClassName } from "$lib/utils";
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export const TEXTAREA_VARIANTS = ["outlined", "filled", "inherit"] as const;
  export type TextareaVariant = (typeof TEXTAREA_VARIANTS)[number];
  export type TextareaVariantProp = { variant?: TextareaVariant };

  export const TEXTAREA_COLORS = COLORS;
  export type TextareaColor = Color;
  export type TextareaColorProp = ColorProp;

  export const TEXTAREA_SIZES = SIZES;
  export type TextareaSize = Size;
  export type TextareaSizeProp = SizeProp;

  export const TEXTAREA_RADII = RADII;
  export type TextareaRadius = Radius;
  export type TextareaRadiusProp = RadiusProp;

  export type TextareaProps = ClassName &
    TextareaVariantProp &
    TextareaSizeProp &
    TextareaRadiusProp &
    TextareaColorProp &
    Omit<HTMLTextareaAttributes, "size">;
</script>

<script lang="ts">
  let {
    value = $bindable(),
    class: className,
    variant = "outlined",
    color = "primary",
    size = "sm",
    radius = "md",
    ...restProps
  }: TextareaProps = $props();
</script>

<textarea
  bind:value
  class={twMerge(
    variant === "outlined" &&
      "bg-m3-surface-container-lowest outline-1 outline-m3-outline-variant hover:outline-m3-outline/80 disabled:hover:outline-m3-outline-variant",
    variant === "filled" &&
      "bg-m3-surface-container hover:bg-m3-surface-container-high focus:outline-1",

    color === "primary" && "focus-visible:outline-m3-primary",
    color === "secondary" && "focus-visible:outline-m3-secondary",
    color === "tertiary" && "focus-visible:outline-m3-tertiary",
    color === "error" && "focus-visible:outline-m3-error",

    size === "xs" && "px-2.5 py-1.5 text-xs",
    size === "sm" && "px-3 py-1.5 text-sm",
    size === "md" && "px-3.5 py-2 text-base",
    size === "lg" && "px-4 py-2.5 text-lg",
    size === "xl" && "px-5 py-4 text-xl",

    radius == "xs" && "rounded-xs",
    radius == "sm" && "rounded-sm",
    radius == "md" && "rounded-lg",
    radius == "lg" && "rounded-2xl",
    radius == "xl" && "rounded-4xl",

    "disabled:cursor-not-allowed disabled:bg-m3-on-surface/12 disabled:text-m3-on-surface/38",

    "px-3 py-2",
    className,
  )}
  {...restProps}
></textarea>
