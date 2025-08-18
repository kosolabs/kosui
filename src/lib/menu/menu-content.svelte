<script module lang="ts">
  import { baseClasses, type Variants } from "$lib/base.js";
  import { getMenuContext } from "$lib/menu/index.js";
  import { mergeComponentProps } from "$lib/merge-props.js";
  import { Popover, type PopoverProps } from "$lib/popover/index.js";
  import { type ClassName } from "$lib/utils.js";
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  export type MenuContentProps = {
    children: Snippet;
  } & ClassName &
    Variants &
    Omit<PopoverProps, "children" | "open">;
</script>

<script lang="ts">
  let {
    children,
    class: className,
    variant = "elevated",
    color = "primary",
    shape = "rounded",
    placement = "bottom",
    ...restProps
  }: MenuContentProps = $props();

  const ctx = getMenuContext();
</script>

<Popover
  bind:open={ctx.open}
  role="menu"
  class={twMerge(
    baseClasses({ variant, color, shape }),
    "max-h-[60%] border bg-m3-surface-container-highest p-1 shadow",
    className,
  )}
  {placement}
  anchorEl={ctx.anchorEl}
  {...mergeComponentProps(Popover, restProps, {
    onmouseleave: () => ctx.blur(),
    onKeydownWhileOpen: (event) => ctx.handleKeyDown(event),
  })}
>
  {@render children()}
</Popover>
