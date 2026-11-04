<script lang="ts">
  import { Button, type ButtonProps } from "#lib/button/index.js";
  import { cn } from "#lib/utils.js";

  export type FabProps = ButtonProps;

  let {
    el = $bindable(),
    class: className,
    size = 20,
    variant = "elevated",
    ...restProps
  }: FabProps = $props();
</script>

<Button
  bind:el
  class={cn("sticky bottom-0 mt-auto ml-auto flex w-fit p-4", className)}
  {variant}
  {size}
  {...restProps}
/>
