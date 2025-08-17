<script lang="ts" module>
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
  } from "$lib/base.js";
  import { noop, type ClassName, type ElementRef } from "$lib/utils.js";
  import { type HTMLInputAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export const INPUT_VARIANTS = ["outlined", "filled", "inherit"] as const;
  export type InputVariant = (typeof INPUT_VARIANTS)[number];
  export type InputVariantProp = { variant?: InputVariant };

  export const INPUT_COLORS = COLORS;
  export type InputColor = Color;
  export type InputColorProp = ColorProp;

  export const INPUT_SIZES = SIZES;
  export type InputSize = Size;
  export type InputSizeProp = SizeProp;

  export const INPUT_RADII = RADII;
  export type InputRadius = Radius;
  export type InputRadiusProp = RadiusProp;

  export type InputProps = ElementRef &
    ClassName &
    InputVariantProp &
    InputSizeProp &
    InputRadiusProp &
    InputColorProp &
    Omit<HTMLInputAttributes, "size">;
</script>

<script lang="ts">
  let {
    value = $bindable(),
    el = $bindable(),
    ref = noop,
    class: className,
    variant = "outlined",
    color = "primary",
    size = "sm",
    radius = "md",
    ...restProps
  }: InputProps = $props();
</script>

<input
  bind:value
  bind:this={el}
  use:ref
  class={twMerge(
    "disabled:cursor-not-allowed disabled:bg-m3-on-surface/12 disabled:text-m3-on-surface/38",

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

    className,
  )}
  {...restProps}
/>
