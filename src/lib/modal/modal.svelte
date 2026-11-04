<script module lang="ts">
  import { events } from "#lib/index.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import { prefersReducedMotion } from "svelte/motion";
  import { scale } from "svelte/transition";

  export type ModalProps = {
    el?: HTMLDialogElement;
    onCancel?: () => void;
    children: Snippet;
  } & ClassName &
    Omit<HTMLDialogAttributes, "class">;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    open = $bindable(),
    onCancel,
    children,
    class: className,
    ...restProps
  }: ModalProps = $props();

  function isolateKeys(event: KeyboardEvent) {
    event.stopImmediatePropagation();
  }

  function oncancel(event: Event) {
    event.preventDefault();
    open = false;
    onCancel?.();
  }

  $effect(() => {
    if (!el) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : undefined;
    if (!el.open) el.showModal();
    events.on("keydown", isolateKeys);

    return () => {
      events.remove("keydown", isolateKeys);
      opener?.focus();
    };
  });
</script>

{#if open}
  <dialog
    bind:this={el}
    closedby="any"
    class={cn(
      "m-auto rounded-lg p-5 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-[2px] data-closing:backdrop:bg-transparent motion-safe:backdrop:transition-colors starting:backdrop:bg-transparent",
      className,
    )}
    transition:scale={{
      duration: prefersReducedMotion.current ? 0 : 150,
      start: 0.95,
    }}
    {...mergeProps(restProps, {
      oncancel,
      onoutrostart: () => el?.setAttribute("data-closing", ""),
    })}
  >
    {@render children()}
  </dialog>
{/if}
