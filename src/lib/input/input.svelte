<script lang="ts" module>
  import type { ColorProp, ShapeProp, Size, SizeProp } from "#lib/base.js";
  import { fieldClasses, type InputVariant } from "#lib/input/field.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLInputAttributes } from "svelte/elements";

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
  class={cn(fieldClasses({ variant, color, shape }), SIZES[size], className)}
  {...restProps}
/>
