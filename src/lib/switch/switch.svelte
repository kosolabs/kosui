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
  import { mergeProps } from "#lib/merge-props.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import SwitchThumb, { type SwitchThumbProps } from "./switch-thumb.svelte";

  export const SWITCH_COLORS = COLORS;
  export type SwitchColor = Color;
  export type SwitchColorProp = ColorProp;

  export const SWITCH_SIZES = SIZES;
  export type SwitchSize = Size;
  export type SwitchSizeProp = SizeProp;

  export type SwitchProps = {
    checked?: boolean;
    thumb?: Snippet<[SwitchThumbProps]>;
  } & ClassName &
    SwitchColorProp &
    SwitchSizeProp &
    ShapeProp &
    HTMLButtonAttributes;
</script>

<script lang="ts">
  let {
    checked = $bindable(false),
    thumb = defaultThumb,
    class: className,
    color = "primary",
    size = "sm",
    shape = "full",
    ...restProps
  }: SwitchProps = $props();
</script>

{#snippet defaultThumb(props: SwitchThumbProps)}
  <SwitchThumb {...props} />
{/snippet}

<button
  type="button"
  role="switch"
  aria-checked={checked}
  class={cn(
    "group relative inline-flex cursor-pointer bg-m3-surface-container-highest transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

    color === "primary" &&
      "focus-visible:outline-m3-primary aria-checked:bg-m3-primary",
    color === "secondary" &&
      "focus-visible:outline-m3-secondary aria-checked:bg-m3-secondary",
    color === "tertiary" &&
      "focus-visible:outline-m3-tertiary aria-checked:bg-m3-tertiary",
    color === "error" &&
      "focus-visible:outline-m3-error aria-checked:bg-m3-error",

    size === "xs" && "h-4 w-8",
    size === "sm" && "h-5 w-10",
    size === "md" && "h-6 w-12",
    size === "lg" && "h-7 w-14",
    size === "xl" && "h-8 w-16",

    baseClasses({ shape }),

    className,
  )}
  {...mergeProps(restProps, { onclick: () => (checked = !checked) })}
>
  {@render thumb({ color, size, shape })}
</button>
