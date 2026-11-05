<script module lang="ts">
  import { Modal, type ModalProps } from "#lib/modal/index.js";
  import { cn } from "#lib/utils.js";
  import { prefersReducedMotion } from "svelte/motion";
  import { fly } from "svelte/transition";

  export type DrawerSide = "start" | "end";

  export type DrawerProps = {
    side?: DrawerSide;
  } & Omit<ModalProps, "transition">;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    open = $bindable(),
    side = "start",
    shape = "lg",
    class: className,
    children,
    ...restProps
  }: DrawerProps = $props();

  function slide(node: Element) {
    const rtl = getComputedStyle(node).direction === "rtl";
    const fromLeft = (side === "start") !== rtl;
    return fly(node, {
      x: fromLeft ? "-100%" : "100%",
      opacity: 1,
      duration: prefersReducedMotion.current ? 0 : 200,
    });
  }
</script>

<Modal
  bind:el
  bind:open
  {shape}
  transition={slide}
  class={cn(
    "my-0 h-full max-h-none w-80 max-w-[calc(100%-3.5rem)] overflow-y-auto bg-m3-surface-container-low p-3",
    side === "start"
      ? "ms-0 me-auto rounded-s-none"
      : "ms-auto me-0 rounded-e-none",
    className,
  )}
  {...restProps}
>
  {@render children()}
</Modal>
