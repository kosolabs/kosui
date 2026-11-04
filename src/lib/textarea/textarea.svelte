<script module lang="ts">
  import type { ColorProp, ShapeProp, Size, SizeProp } from "#lib/base.js";
  import { fieldClasses, type InputVariant } from "#lib/input/field.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  export type TextareaProps = {
    variant?: InputVariant;
    el?: HTMLTextAreaElement;
  } & ClassName &
    ColorProp &
    SizeProp &
    ShapeProp &
    Omit<HTMLTextareaAttributes, "class">;

  const SIZES: Record<Size, string> = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-3.5 py-2.5 text-base",
    lg: "px-4 py-3 text-lg",
    xl: "px-5 py-4 text-xl",
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
  }: TextareaProps = $props();
</script>

<textarea
  bind:value
  bind:this={el}
  class={cn(fieldClasses({ variant, color, shape }), SIZES[size], className)}
  {...restProps}></textarea>
