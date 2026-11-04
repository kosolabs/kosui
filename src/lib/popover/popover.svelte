<script lang="ts" module>
  import { events } from "#lib/index.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { Shortcut } from "#lib/shortcut/index.js";
  import {
    cn,
    type ClassName,
    type ToggleEventWithTarget,
  } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import type { HTMLAttributes } from "svelte/elements";
  import { scale } from "svelte/transition";

  type Side = "top" | "right" | "bottom" | "left";
  export type PopoverPlacement = Side | `${Side}-start` | `${Side}-end`;

  export type PopoverProps = {
    placement?: PopoverPlacement;
    open?: boolean;
    anchorEl?: HTMLElement;
    onKeydownWhileOpen?: (event: KeyboardEvent) => void;
    children: Snippet;
    el?: HTMLDivElement;
  } & ClassName &
    Omit<HTMLAttributes<HTMLDivElement>, "class">;

  const AREAS: Record<PopoverPlacement, string> = {
    top: "top span-all",
    "top-start": "top span-right",
    "top-end": "top span-left",
    bottom: "bottom span-all",
    "bottom-start": "bottom span-right",
    "bottom-end": "bottom span-left",
    left: "left span-all",
    "left-start": "left span-bottom",
    "left-end": "left span-top",
    right: "right span-all",
    "right-start": "right span-bottom",
    "right-end": "right span-top",
  };
</script>

<script lang="ts">
  let {
    placement = "top",
    open = $bindable(false),
    anchorEl,
    children,
    onKeydownWhileOpen,
    el: popoverEl = $bindable(),
    class: className,
    ...restProps
  }: PopoverProps = $props();

  let side = $derived(placement.split("-")[0] as Side);
  let vertical = $derived(side === "top" || side === "bottom");
  let centered = $derived(!placement.includes("-"));

  function handleEscape(event: KeyboardEvent) {
    if (popoverEl && Shortcut.ESCAPE.matches(event)) {
      popoverEl.hidePopover();
      anchorEl?.focus();
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      popoverEl &&
      event.target instanceof Node &&
      !popoverEl.contains(event.target) &&
      (!anchorEl || !anchorEl.contains(event.target))
    ) {
      popoverEl.hidePopover();
    }
  }

  function onbeforetoggle(event: ToggleEventWithTarget<HTMLDivElement>) {
    open = event.newState === "open";
  }

  $effect(() => {
    if (!open || !popoverEl) return;
    if (!popoverEl.matches(":popover-open")) {
      popoverEl.showPopover({ source: anchorEl });
    }
    events.on("keydown", handleEscape);
    events.on("keydown", onKeydownWhileOpen);
    events.on("mousedown", handleClickOutside);

    return () => {
      events.remove("keydown", handleEscape);
      events.remove("keydown", onKeydownWhileOpen);
      events.remove("mousedown", handleClickOutside);
    };
  });
</script>

{#if open}
  <div
    bind:this={popoverEl}
    popover="manual"
    class={cn(className)}
    style:position-area={anchorEl && AREAS[placement]}
    style:position-try-fallbacks={anchorEl &&
      (vertical
        ? "flip-block, flip-inline, flip-block flip-inline"
        : "flip-inline, flip-block, flip-block flip-inline")}
    style:inset={anchorEl && "auto"}
    style:margin={anchorEl && (centered ? "6px" : vertical ? "6px 0" : "0 6px")}
    style:justify-self={anchorEl && vertical && centered
      ? "anchor-center"
      : undefined}
    style:align-self={anchorEl && !vertical && centered
      ? "anchor-center"
      : undefined}
    transition:scale={{
      duration: prefersReducedMotion.current ? 0 : 150,
      start: 0.95,
    }}
    {...mergeProps(restProps, { onbeforetoggle })}
  >
    {@render children()}
  </div>
{/if}
