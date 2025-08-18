<script lang="ts" module>
  import { Box, type BoxProps } from "$lib/box/index.js";
  import { twMerge } from "tailwind-merge";

  export type AlertProps = BoxProps;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    class: className,
    variant = "elevated",
    color = "primary",
    shape = "rounded",
    backdrop = true,
    ...restProps
  }: AlertProps = $props();
</script>

<Box
  bind:el
  {variant}
  {color}
  {shape}
  {backdrop}
  class={twMerge("p-3", className)}
  {...restProps}
/>
