<script lang="ts" module>
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
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
  } from "../base";
  import { mergeProps } from "../merge-props";
  import type { ClassName } from "../utils";

  export const SWITCH_COLORS = COLORS;
  export type SwitchColor = Color;
  export type SwitchColorProp = ColorProp;

  export const SWITCH_SIZES = SIZES;
  export type SwitchSize = Size;
  export type SwitchSizeProp = SizeProp;

  export const SWITCH_RADII = RADII;
  export type SwitchRadius = Radius;
  export type SwitchRadiusProp = RadiusProp;

  export type SwitchProps = {
    checked?: boolean;
  } & ClassName &
    SwitchSizeProp &
    SwitchRadiusProp &
    SwitchColorProp &
    HTMLButtonAttributes;
</script>

<script lang="ts">
  let {
    checked = $bindable(false),
    class: className,
    color = "primary",
    size = "sm",
    radius = "xl",
    ...restProps
  }: SwitchProps = $props();
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  class={twMerge(
    "group relative inline-flex cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

    color === "primary" && "focus-visible:outline-m3-primary",
    color === "secondary" && "focus-visible:outline-m3-secondary",
    color === "tertiary" && "focus-visible:outline-m3-tertiary",
    color === "error" && "focus-visible:outline-m3-error",

    className,
  )}
  {...mergeProps(restProps, { onclick: () => (checked = !checked) })}
>
  <!-- Track -->
  <div
    class={twMerge(
      "bg-m3-surface-container-highest transition-colors",

      color === "primary" && "group-aria-checked:bg-m3-primary",
      color === "secondary" && "group-aria-checked:bg-m3-secondary",
      color === "tertiary" && "group-aria-checked:bg-m3-tertiary",
      color === "error" && "group-aria-checked:bg-m3-error",

      size === "xs" && "h-4 w-8",
      size === "sm" && "h-5 w-10",
      size === "md" && "h-6 w-12",
      size === "lg" && "h-7 w-14",
      size === "xl" && "h-8 w-16",

      radius === "xs" && "rounded-xs",
      radius === "sm" && "rounded-sm",
      radius === "md" && "rounded-lg",
      radius === "lg" && "rounded-2xl",
      radius === "xl" && "rounded-4xl",
    )}
  ></div>
  <!-- Thumb -->
  <div
    class={twMerge(
      "absolute top-0.5 left-0.5 bg-m3-on-primary shadow-sm transition-all",

      size === "xs" && "size-3 group-aria-checked:translate-x-4",
      size === "sm" && "size-4 group-aria-checked:translate-x-5",
      size === "md" && "size-5 group-aria-checked:translate-x-6",
      size === "lg" && "size-6 group-aria-checked:translate-x-7",
      size === "xl" && "size-7 group-aria-checked:translate-x-8",

      radius === "xs" && "rounded-xs",
      radius === "sm" && "rounded-sm",
      radius === "md" && "rounded-lg",
      radius === "lg" && "rounded-2xl",
      radius === "xl" && "rounded-4xl",
    )}
  ></div>
</button>
