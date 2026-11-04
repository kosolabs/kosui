<script module lang="ts">
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
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  export const TEXTAREA_VARIANTS = ["outlined", "filled", "inherit"] as const;
  export type TextareaVariant = (typeof TEXTAREA_VARIANTS)[number];
  export type TextareaVariantProp = { variant?: TextareaVariant };

  export const TEXTAREA_COLORS = COLORS;
  export type TextareaColor = Color;
  export type TextareaColorProp = ColorProp;

  export const TEXTAREA_SIZES = SIZES;
  export type TextareaSize = Size;
  export type TextareaSizeProp = SizeProp;

  export type TextareaProps = ClassName &
    TextareaVariantProp &
    TextareaSizeProp &
    ShapeProp &
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
    shape = "xs",
    ...restProps
  }: TextareaProps = $props();
</script>

<textarea
  bind:value
  class={cn(
    "px-3 py-2 disabled:cursor-not-allowed disabled:bg-m3-on-surface/12 disabled:text-m3-on-surface/38",

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
  {...restProps}></textarea>
