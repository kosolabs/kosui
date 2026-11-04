<script module lang="ts">
  import type { Color, Shape, Size } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { getToggleContext } from "#lib/toggle/toggle-context.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type ToggleButtonProps<T> = {
    value: T;
    children: Snippet;
    el?: HTMLInputElement;
  } & ClassName &
    Omit<
      HTMLInputAttributes,
      "value" | "type" | "name" | "checked" | "children" | "class"
    >;

  const SIZES: Record<Size, string> = {
    xs: "h-7 gap-1.5 px-3 text-xs",
    sm: "h-9 gap-2 px-4 text-sm",
    md: "h-11 gap-2 px-5 text-base",
    lg: "h-13 gap-2.5 px-6 text-lg",
    xl: "h-15 gap-3 px-7 text-xl",
  };

  const SHAPES: Record<Shape, string> = {
    none: "",
    xs: "first:rounded-l-sm last:rounded-r-sm",
    sm: "first:rounded-l-lg last:rounded-r-lg",
    md: "first:rounded-l-xl last:rounded-r-xl",
    lg: "first:rounded-l-2xl last:rounded-r-2xl",
    xl: "first:rounded-l-[1.75rem] last:rounded-r-[1.75rem]",
    full: "first:rounded-l-full last:rounded-r-full",
  };

  const COLORS: Record<Color, string> = {
    primary:
      "border-m3-primary text-m3-primary has-checked:bg-m3-primary has-checked:text-m3-on-primary",
    secondary:
      "border-m3-secondary text-m3-secondary has-checked:bg-m3-secondary has-checked:text-m3-on-secondary",
    tertiary:
      "border-m3-tertiary text-m3-tertiary has-checked:bg-m3-tertiary has-checked:text-m3-on-tertiary",
    error:
      "border-m3-error text-m3-error has-checked:bg-m3-error has-checked:text-m3-on-error",
    plain:
      "border-current has-checked:bg-current/10 has-checked:shadow-[inset_0_0_0_2px_currentColor]",
    inherit:
      "border-current has-checked:bg-current/10 has-checked:shadow-[inset_0_0_0_2px_currentColor]",
  };

  const FOCUS: Record<Color, string> = {
    primary: "focus-visible:outline-m3-primary",
    secondary: "focus-visible:outline-m3-secondary",
    tertiary: "focus-visible:outline-m3-tertiary",
    error: "focus-visible:outline-m3-error",
    plain: "focus-visible:outline-current",
    inherit: "focus-visible:outline-current",
  };
</script>

<script lang="ts" generics="T">
  let {
    value,
    children,
    el = $bindable(),
    class: className,
    ...restProps
  }: ToggleButtonProps<T> = $props();

  const ctx = getToggleContext();
</script>

<label
  class={cn(
    "relative inline-flex cursor-pointer items-center justify-center border-y border-l select-none last:border-r has-disabled:cursor-not-allowed has-disabled:opacity-38",
    SIZES[ctx.size],
    SHAPES[ctx.shape],
    COLORS[ctx.color],
    className,
  )}
>
  <input
    bind:this={el}
    type="radio"
    name={ctx.name}
    value={String(value)}
    checked={ctx.value === value}
    class={cn(
      "absolute -inset-px cursor-[inherit] appearance-none rounded-[inherit] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
      FOCUS[ctx.color],
    )}
    {...mergeProps(restProps, { onchange: () => ctx.select(value) })}
  />
  {@render children()}
</label>
