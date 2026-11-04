<script module lang="ts">
  import type { Variants } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { getToggleContext } from "#lib/toggle/index.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export type ToggleButtonProps<T> = {
    value: T;
    children: Snippet;
  } & ElementRef &
    ClassName &
    Omit<Variants, "variant"> &
    Omit<HTMLButtonAttributes, "value">;
</script>

<script lang="ts" generics="T">
  let {
    value,
    children,
    el = $bindable(),
    class: className,
    color = "primary",
    shape = "full",
    type = "button",
    ...restProps
  }: ToggleButtonProps<T> = $props();

  const ctx = getToggleContext<T>();
</script>

<button
  bind:this={el}
  role="option"
  aria-selected={ctx.value === value}
  class={cn(
    "bg-md-background text-md-on-surface flex items-center gap-1 border-y border-l px-4 py-2 text-sm last:border-r",

    shape === "xs" && "first:rounded-l-sm last:rounded-r-sm",
    shape === "sm" && "first:rounded-l-lg last:rounded-r-lg",
    shape === "md" && "first:rounded-l-xl last:rounded-r-xl",
    shape === "lg" && "first:rounded-l-2xl last:rounded-r-2xl",
    shape === "xl" && "first:rounded-l-[1.75rem] last:rounded-r-[1.75rem]",
    shape === "full" && "first:rounded-l-full last:rounded-r-full",

    color === "primary" &&
      "border-m3-primary text-m3-primary aria-selected:bg-m3-primary aria-selected:text-m3-on-primary",
    color === "secondary" &&
      "border-m3-secondary text-m3-secondary aria-selected:bg-m3-secondary aria-selected:text-m3-on-secondary",
    color === "tertiary" &&
      "border-m3-tertiary text-m3-tertiary aria-selected:bg-m3-tertiary aria-selected:text-m3-on-tertiary",
    color === "error" &&
      "border-m3-error text-m3-error aria-selected:bg-m3-error aria-selected:text-m3-on-error",

    className,
  )}
  {type}
  {...mergeProps(restProps, { onclick: () => (ctx.value = value) })}
>
  {@render children()}
</button>
