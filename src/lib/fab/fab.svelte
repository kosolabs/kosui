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

<Button bind:el class={cn("p-4", className)} {variant} {size} {...restProps} />
