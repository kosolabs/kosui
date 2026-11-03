<script lang="ts" module>
  import { Popover, type PopoverProps } from "#lib/popover/index.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";

  export type TooltipTriggerProps = {
    ref: (el: HTMLElement) => void;
    "aria-describedby"?: string;
    onclick?: () => void;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: () => void;
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
  const generatedId = $props.id();

  let {
    id: providedId,
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

  let id = $derived(providedId ?? generatedId);

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

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

  const triggerProps: TooltipTriggerProps = $derived(
    click
      ? {
          ref: (ref) => (anchorEl = ref),
          onclick: () => (open = true),
        }
      : {
          ref: (ref) => (anchorEl = ref),
          "aria-describedby": open ? id : undefined,
          onmouseenter: () => !isTouchDevice() && show(),
          onmouseleave: () => hide(),
          onfocus: (event) => {
            if (
              event.target instanceof HTMLElement &&
              event.target.matches(":focus-visible")
            ) {
              cancel();
              open = true;
            }
          },
          onblur: () => hide(),
          ontouchstart: () => show(delay),
          ontouchend: () => cancel(),
        },
  );
</script>

<Popover
  bind:open
  role="tooltip"
  {id}
  {anchorEl}
  {arrow}
  class={cn(
    arrow && "overflow-visible",
    rich
      ? "rounded-md border bg-m3-surface-container p-2 text-sm shadow shadow-m3-shadow/20"
      : "rounded-sm bg-m3-inverse-surface px-2 py-1 text-xs text-m3-inverse-on-surface",
    className,
  )}
  arrowClass={cn(
    rich
      ? "bg-m3-surface-container border-r border-b"
      : "bg-m3-inverse-surface",
  )}
  {...restProps}
/>

{@render trigger?.(triggerProps)}
