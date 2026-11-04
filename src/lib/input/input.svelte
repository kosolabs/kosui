<script lang="ts" module>
  import {
    baseClasses,
    type ColorProp,
    type ShapeProp,
    type Size,
    type SizeProp,
  } from "#lib/base.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLInputAttributes } from "svelte/elements";

  export const INPUT_VARIANTS = ["outlined", "filled", "plain"] as const;
  export type InputVariant = (typeof INPUT_VARIANTS)[number];

  export type InputProps = {
    variant?: InputVariant;
    el?: HTMLInputElement;
  } & ClassName &
    ColorProp &
    SizeProp &
    ShapeProp &
    Omit<HTMLInputAttributes, "size" | "class">;

  const SIZES: Record<Size, string> = {
    xs: "h-7 px-2.5 text-xs",
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-3.5 text-base",
    lg: "h-13 px-4 text-lg",
    xl: "h-15 px-5 text-xl",
  };
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
    "min-w-0 bg-transparent placeholder:text-m3-on-surface-variant focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-m3-on-surface/38 disabled:placeholder:text-m3-on-surface/38",

    variant === "outlined" &&
      "bg-m3-surface-container-lowest outline-1 outline-m3-outline hover:outline-m3-on-surface disabled:outline-m3-on-surface/12",
    variant === "filled" &&
      "border-b border-m3-on-surface-variant bg-m3-surface-container-highest hover:border-m3-on-surface disabled:border-m3-on-surface/38 disabled:bg-m3-on-surface/4",

    color === "primary" && "focus-visible:outline-m3-primary",
    color === "secondary" && "focus-visible:outline-m3-secondary",
    color === "tertiary" && "focus-visible:outline-m3-tertiary",
    color === "error" && "focus-visible:outline-m3-error",
    (color === "plain" || color === "inherit") &&
      "focus-visible:outline-current",

    "user-invalid:border-m3-error user-invalid:outline-m3-error user-invalid:focus-visible:outline-m3-error aria-invalid:border-m3-error aria-invalid:outline-m3-error",

    SIZES[size],
    baseClasses({ shape }),

    className,
  )}
  {...restProps}
/>
