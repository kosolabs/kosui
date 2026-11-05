<script module lang="ts">
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type MenuGroupProps = {
    label: string;
    el?: HTMLDivElement;
    children: Snippet;
  } & ClassName &
    Omit<HTMLAttributes<HTMLDivElement>, "class">;
</script>

<script lang="ts">
  let {
    label,
    children,
    el = $bindable(),
    class: className,
    ...restProps
  }: MenuGroupProps = $props();

  const id = $props.id();
</script>

<div
  bind:this={el}
  role="group"
  aria-labelledby="{id}-label"
  class={cn(className)}
  {...restProps}
>
  <div
    id="{id}-label"
    class="px-3 pt-2 pb-1 text-xs font-medium text-m3-on-surface-variant"
  >
    {label}
  </div>
  {@render children()}
</div>
