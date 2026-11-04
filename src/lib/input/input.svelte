<script lang="ts" module>
  import {
    baseClasses,
    COLORS,
    SIZES,
    type Color,
    type ColorProp,
    type ShapeProp,
    type Size,
    type SizeProp,
  } from "#lib/base.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { HTMLInputAttributes } from "svelte/elements";

  export const INPUT_VARIANTS = ["outlined", "filled", "inherit"] as const;
  export type InputVariant = (typeof INPUT_VARIANTS)[number];
  export type InputVariantProp = { variant?: InputVariant };

  export const INPUT_COLORS = COLORS;
  export type InputColor = Color;
  export type InputColorProp = ColorProp;

  export const INPUT_SIZES = SIZES;
  export type InputSize = Size;
  export type InputSizeProp = SizeProp;

  export type InputProps = ElementRef &
    ClassName &
    InputVariantProp &
    InputSizeProp &
    ShapeProp &
    InputColorProp &
    Omit<HTMLInputAttributes, "size">;
</script>

<script lang="ts">
  let {
    value = $bindable(),
    el = $bindable(),
    class: className,
    variant = "outlined",
    color = "primary",
    size = "sm",
    shape = "xs",
    ...restProps
  }: InputProps = $props();
</script>

<input
  bind:value
  bind:this={el}
  class={cn(
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

    baseClasses({ shape }),

    className,
  )}
  {...restProps}
/>
