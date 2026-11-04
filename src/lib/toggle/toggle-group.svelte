<script module lang="ts">
  import type { ColorProp, ShapeProp, SizeProp } from "#lib/base.js";
  import { setToggleContext } from "#lib/toggle/toggle-context.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type ToggleGroupProps<T> = {
    value?: T;
    onChange?: (value: T) => void;
    name?: string;
    children: Snippet;
    el?: HTMLDivElement;
  } & ClassName &
    ColorProp &
    SizeProp &
    ShapeProp &
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "class">;
</script>

<script lang="ts" generics="T">
  let {
    value = $bindable(),
    onChange,
    name,
    children,
    el = $bindable(),
    class: className,
    color = "primary",
    size = "sm",
    shape = "full",
    ...restProps
  }: ToggleGroupProps<T> = $props();

  const id = $props.id();

  setToggleContext({
    get value() {
      return value;
    },
    get name() {
      return name ?? id;
    },
    get color() {
      return color;
    },
    get size() {
      return size;
    },
    get shape() {
      return shape;
    },
    select(selected) {
      value = selected as T;
      onChange?.(selected as T);
    },
  });
</script>

<div
  bind:this={el}
  role="radiogroup"
  class={cn("flex", className)}
  {...restProps}
>
  {@render children()}
</div>
