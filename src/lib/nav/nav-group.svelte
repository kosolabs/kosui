<script module lang="ts">
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type NavGroupProps = {
    label: string;
    children: Snippet;
  } & ElementRef &
    ClassName &
    Omit<HTMLAttributes<HTMLDivElement>, "class">;
</script>

<script lang="ts">
  let {
    label,
    children,
    el = $bindable(),
    class: className,
    ...restProps
  }: NavGroupProps = $props();

  const id = $props.id();
</script>

<div
  bind:this={el}
  role="group"
  aria-labelledby="{id}-label"
  class={cn("flex flex-col gap-0.5", className)}
  {...restProps}
>
  <div
    id="{id}-label"
    class="px-4 pt-4 pb-1 text-xs font-medium tracking-wide text-m3-on-surface-variant uppercase"
  >
    {label}
  </div>
  {@render children()}
</div>
