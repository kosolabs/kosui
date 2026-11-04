<script lang="ts" module>
  import {
    baseClasses,
    type Size,
    type SizeProp,
    type Variants,
  } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { Tooltip, type TooltipTriggerProps } from "#lib/tooltip/index.js";
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { LucideIcon } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";

  type ButtonOwnProps = {
    icon?: LucideIcon;
    tooltip?: Snippet | string;
  } & ElementRef &
    ClassName &
    Variants &
    SizeProp;

  export type ButtonActionProps = ButtonOwnProps & {
    href?: undefined;
  } & HTMLButtonAttributes;

  export type ButtonLinkProps = ButtonOwnProps & {
    href: string;
  } & Omit<HTMLAnchorAttributes, "href">;

  export type ButtonProps = ButtonActionProps | ButtonLinkProps;

  const LABEL_SIZES: Record<Size, string> = {
    xs: "gap-1.5 px-3 py-1.5 text-xs",
    sm: "gap-2 px-4 py-2 text-sm",
    md: "gap-2 px-5 py-2.5 text-base",
    lg: "gap-2.5 px-6 py-3 text-lg",
    xl: "gap-3 px-7 py-4 text-xl",
  };
  const ICON_ONLY_SIZES: Record<Size, string> = {
    xs: "size-7",
    sm: "size-9",
    md: "size-11",
    lg: "size-13",
    xl: "size-15",
  };
  const ICON_SIZES: Record<Size, number> = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 22,
    xl: 24,
  };
</script>

<script lang="ts">
  let {
    icon: IconComponent,
    tooltip,
    children,
    el = $bindable(),
    class: className,
    variant = "outlined",
    color = "primary",
    shape = "full",
    size = "sm",
    ...restProps
  }: ButtonProps = $props();

  let tooltipLabel = $derived(
    !children && typeof tooltip === "string" ? tooltip : undefined,
  );

  let classes = $derived(
    cn(
      baseClasses({ variant, color, shape, hover: true, focus: true }),
      "inline-flex shrink-0 items-center justify-center text-nowrap transition-all select-none not-disabled:active:scale-95",
      children ? LABEL_SIZES[size] : ICON_ONLY_SIZES[size],
      className,
    ),
  );
</script>

{#snippet content()}
  {#if IconComponent}
    <IconComponent size={ICON_SIZES[size]} />
  {/if}
  {@render children?.()}
{/snippet}

{#snippet button({
  "aria-describedby": describedBy,
  ...triggerProps
}: TooltipTriggerProps)}
  {#if restProps.href === undefined}
    <button
      bind:this={el}
      aria-label={tooltipLabel}
      aria-describedby={tooltipLabel ? undefined : describedBy}
      class={classes}
      type="button"
      {...mergeProps(restProps, triggerProps)}
    >
      {@render content()}
    </button>
  {:else}
    <!-- eslint-disable svelte/no-navigation-without-resolve -->
    <a
      bind:this={el}
      aria-label={tooltipLabel}
      aria-describedby={tooltipLabel ? undefined : describedBy}
      class={classes}
      {...mergeProps(restProps, triggerProps)}
    >
      {@render content()}
    </a>
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
  {/if}
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
  {@render button({})}
{/if}
