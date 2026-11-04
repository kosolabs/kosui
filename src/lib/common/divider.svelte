<script module lang="ts">
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  export type DividerProps = ElementRef &
    ClassName &
    HTMLAttributes<HTMLHRElement>;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    class: className,
    ...restProps
  }: DividerProps = $props();
</script>

<hr bind:this={el} class={cn("my-1", className)} {...restProps} />
