<script lang="ts" module>
  import { Popover, type PopoverProps } from "$lib/popover/index.js";
  import type { ClassName } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  export type TooltipTriggerProps = {
    ref: (el: HTMLElement) => void;
    onclick?: () => void;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
    ontouchstart?: () => void;
    ontouchend?: () => void;
  };

  export type TooltipProps = {
    delay?: number;
    open?: boolean;
    click?: boolean;
    rich?: boolean;
    trigger?: Snippet<[TooltipTriggerProps]>;
  } & ClassName &
    PopoverProps;
</script>

<script lang="ts">
  let {
    delay = 500,
    open = $bindable(false),
    click = false,
    rich = false,
    arrow,
    trigger,
    anchorEl,
    class: className,
    ...restProps
  }: TooltipProps = $props();

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  let timeout: number;

  export function show(after?: number) {
    timeout = window.setTimeout(
      () => (open = true),
      after === undefined ? delay : after,
    );
  }

  export function cancel() {
    window.clearTimeout(timeout);
  }

  export function hide() {
    cancel();
    open = false;
  }

  const triggerProps: TooltipTriggerProps = click
    ? {
        ref: (ref) => (anchorEl = ref),
        onclick: () => (open = true),
      }
    : {
        ref: (ref) => (anchorEl = ref),
        onmouseenter: () => !isTouchDevice && show(),
        onmouseleave: () => hide(),
        ontouchstart: () => show(delay),
        ontouchend: () => cancel(),
      };
</script>

<Popover
  bind:open
  role="tooltip"
  {anchorEl}
  {arrow}
  class={twMerge(
    arrow && "overflow-visible",
    rich
      ? "rounded-md border bg-m3-surface-container p-2 text-sm shadow shadow-m3-shadow/20"
      : "rounded-sm bg-m3-inverse-surface px-2 py-1 text-xs text-m3-inverse-on-surface",
    className,
  )}
  arrowClass={twMerge(
    rich
      ? "bg-m3-surface-container border-r border-b"
      : "bg-m3-inverse-surface",
  )}
  {...restProps}
/>

{@render trigger?.(triggerProps)}
