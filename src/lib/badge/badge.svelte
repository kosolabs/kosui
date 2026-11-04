<script lang="ts">
  import { baseClasses, type ColorProp, type VariantProp } from "#lib/base.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export type BadgeProps = {
    content?: Snippet | string;
    verticalAlignment?: "top" | "bottom";
    horizontalAlignment?: "left" | "right";
    children?: Snippet;
  } & ElementRef &
    ClassName &
    VariantProp &
    ColorProp &
    Omit<HTMLAttributes<HTMLSpanElement>, "content">;

  let {
    content,
    verticalAlignment = "top",
    horizontalAlignment = "right",
    children,
    el = $bindable(),
    class: className,
    variant = "filled",
    color = "error",
    ...restProps
  }: BadgeProps = $props();
</script>

<span class="relative inline-flex">
  {@render children?.()}
  {#if content}
    <span
      bind:this={el}
      class={cn(
        baseClasses({ variant, color, shape: "full" }),
        "absolute inline-flex h-5 min-w-5 items-center justify-center px-1 text-xs tabular-nums",
        verticalAlignment === "top" && "top-0 -translate-y-1/2",
        verticalAlignment === "bottom" && "bottom-0 translate-y-1/2",
        horizontalAlignment === "left" && "left-0 -translate-x-1/2",
        horizontalAlignment === "right" && "right-0 translate-x-1/2",
        className,
      )}
      {...restProps}
    >
      {#if typeof content === "function"}
        {@render content()}
      {:else}
        {content}
      {/if}
    </span>
  {/if}
</span>
