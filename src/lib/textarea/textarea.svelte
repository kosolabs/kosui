<script module lang="ts">
  import { baseClasses, type Variants } from "$lib/base";
  import { noop, type ClassName, type ElementRef } from "$lib/utils";
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type TextareaProps = ElementRef &
    ClassName &
    Variants &
    HTMLTextareaAttributes;
</script>

<script lang="ts">
  let {
    value = $bindable(),
    el = $bindable(),
    ref = noop,
    class: className,
    variant = "outlined",
    color = "secondary",
    shape = "rounded",
    ...restProps
  }: TextareaProps = $props();
</script>

<textarea
  bind:this={el}
  use:ref
  bind:value
  class={twMerge(
    "bg-m3-surface-container",
    baseClasses({ variant, color, shape, hover: true, focus: true }),

    (variant === "outlined" || variant === "plain") &&
      "hover:bg-m3-surface-container-low focus-visible:bg-m3-surface-container-low",

    "px-3 py-2",
    className,
  )}
  {...restProps}
></textarea>
