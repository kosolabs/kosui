<script module lang="ts">
  import { getAutocompleteContext } from "$lib/autocomplete/index.js";
  import { baseClasses, type Variants } from "$lib/base.js";
  import { Popover, type PopoverProps } from "$lib/popover/index.js";
  import { type ClassName } from "$lib/utils.js";
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  export type AutocompleteProps = {
    children: Snippet;
  } & ClassName &
    Variants &
    Omit<PopoverProps, "children">;
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    children,
    class: className,
    variant = "elevated",
    color = "primary",
    shape = "rounded",
    ...restProps
  }: AutocompleteProps = $props();

  const ctx = getAutocompleteContext();
  ctx.bindOpen(
    () => open,
    (newval) => (open = newval),
  );
</script>

<Popover
  bind:open={ctx.open}
  role="menu"
  class={twMerge(
    baseClasses({ variant, color, shape }),
    "max-h-[40%] border bg-m3-surface-container-highest p-1 shadow",
    className,
  )}
  anchorEl={ctx.anchorEl}
  placement="bottom"
  {...restProps}
>
  {@render children()}
</Popover>
