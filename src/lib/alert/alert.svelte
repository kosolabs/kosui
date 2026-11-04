<script lang="ts" module>
  import { Box, type BoxProps } from "#lib/box/index.js";
  import { cn } from "#lib/utils.js";

  export type AlertProps = BoxProps;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    class: className,
    variant = "tonal",
    color = "primary",
    shape = "rounded",
    ...restProps
  }: AlertProps = $props();
</script>

<Box
  bind:el
  role="alert"
  {variant}
  {color}
  {shape}
  class={cn("p-4", className)}
  {...restProps}
/>
