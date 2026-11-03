<script lang="ts" module>
  import { baseClasses, type Variants } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { Tooltip, type TooltipTriggerProps } from "#lib/tooltip/index.js";
  import { cn, noop, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { LucideIcon } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export type ButtonProps = {
    icon?: LucideIcon;
    size?: number;
    tooltip?: Snippet | string;
  } & ElementRef &
    ClassName &
    Variants &
    HTMLButtonAttributes;
</script>

<script lang="ts">
  let {
    icon: IconComponent,
    size = 16,
    tooltip,
    children,
    el = $bindable(),
    ref = noop,
    class: className,
    variant = "outlined",
    color = "primary",
    shape = "rounded",
    type = "button",
    ...restProps
  }: ButtonProps = $props();

  let tooltipLabel = $derived(
    !children && typeof tooltip === "string" ? tooltip : undefined,
  );
</script>

{#snippet button({
  ref: anchorRef,
  "aria-describedby": describedBy,
  ...triggerProps
}: TooltipTriggerProps)}
  <button
    bind:this={el}
    use:ref
    use:anchorRef
    aria-label={tooltipLabel}
    aria-describedby={tooltipLabel ? undefined : describedBy}
    class={cn(
      baseClasses({ variant, color, shape, hover: true, focus: true }),
      "inline-flex items-center justify-center gap-2 text-sm text-nowrap transition-all select-none enabled:active:scale-95",
      children ? "px-4 py-2" : "p-2",
      className,
    )}
    {type}
    {...mergeProps(restProps, triggerProps)}
  >
    {#if IconComponent}
      <IconComponent {size} />
    {/if}
    {@render children?.()}
  </button>
{/snippet}

{#if tooltip}
  <Tooltip arrow>
    {#snippet trigger(props)}
      {@render button(props)}
    {/snippet}
    {#if typeof tooltip === "function"}
      {@render tooltip()}
    {:else}
      {tooltip}
    {/if}
  </Tooltip>
{:else}
  {@render button({ ref: noop })}
{/if}
