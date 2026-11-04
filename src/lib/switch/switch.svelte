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

  export type SwitchProps = {
    checked?: boolean;
    el?: HTMLInputElement;
  } & ClassName &
    ColorProp &
    SizeProp &
    ShapeProp &
    Omit<HTMLInputAttributes, "type" | "role" | "size" | "class" | "checked">;

  const SIZES: Record<Size, string> = {
    xs: "h-4 w-7 before:size-2 checked:before:translate-x-3",
    sm: "h-6 w-10 before:size-4 checked:before:translate-x-4",
    md: "h-7 w-12 before:size-5 checked:before:translate-x-5",
    lg: "h-8 w-13 before:size-6 checked:before:translate-x-5",
    xl: "h-9 w-15 before:size-7 checked:before:translate-x-6",
  };
</script>

<script lang="ts">
  let {
    checked = $bindable(),
    el = $bindable(),
    class: className,
    color = "primary",
    size = "sm",
    shape = "full",
    ...restProps
  }: SwitchProps = $props();
</script>

<input
  bind:this={el}
  bind:checked
  type="checkbox"
  role="switch"
  class={cn(
    "relative inline-block shrink-0 cursor-pointer appearance-none bg-m3-surface-container-highest align-middle ring-2 ring-m3-outline ring-inset before:absolute before:top-1 before:left-1 before:rounded-[inherit] before:bg-m3-outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-38 motion-safe:transition-colors motion-safe:before:transition-all",

    color === "primary" &&
      "checked:bg-m3-primary checked:ring-m3-primary checked:before:bg-m3-on-primary focus-visible:outline-m3-primary",
    color === "secondary" &&
      "checked:bg-m3-secondary checked:ring-m3-secondary checked:before:bg-m3-on-secondary focus-visible:outline-m3-secondary",
    color === "tertiary" &&
      "checked:bg-m3-tertiary checked:ring-m3-tertiary checked:before:bg-m3-on-tertiary focus-visible:outline-m3-tertiary",
    color === "error" &&
      "checked:bg-m3-error checked:ring-m3-error checked:before:bg-m3-on-error focus-visible:outline-m3-error",
    (color === "plain" || color === "inherit") &&
      "checked:bg-current checked:ring-current checked:before:bg-m3-surface focus-visible:outline-current",

    SIZES[size],
    baseClasses({ shape }),

    className,
  )}
  {...restProps}
/>
