<script module lang="ts">
  import { setToggleContext, ToggleContext } from "#lib/toggle/index.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type ToggleGroupProps<T> = {
    value?: T;
    onChange?: (value?: T) => void;
    children: Snippet<[]>;
  } & ElementRef &
    ClassName &
    Omit<HTMLAttributes<HTMLDivElement>, "children">;
</script>

<script lang="ts" generics="T">
  let {
    value = $bindable(),
    onChange,
    children,
    el = $bindable(),
    class: className,
    ...restProps
  }: ToggleGroupProps<T> = $props();

  setToggleContext(
    new ToggleContext(
      () => value,
      (newValue) => {
        value = newValue;
        onChange?.(newValue);
      },
    ),
  );
</script>

<div
  bind:this={el}
  role="listbox"
  aria-orientation="horizontal"
  class={cn("flex", className)}
  {...restProps}
>
  {@render children()}
</div>
