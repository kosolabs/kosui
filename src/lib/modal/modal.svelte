<script module lang="ts">
  import { events } from "#lib/index.js";
  import { baseClasses, type ShapeProp } from "#lib/base.js";
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
    ShapeProp &
    Omit<HTMLDialogAttributes, "class">;

  type Layer = { el: HTMLDialogElement; opener?: HTMLElement };

  const layers: Layer[] = [];

  function focusedElement() {
    const active = document.activeElement;
    return active instanceof HTMLElement && active !== document.body
      ? active
      : undefined;
  }

  function closeLayer(layer: Layer) {
    const index = layers.indexOf(layer);
    layers.splice(index, 1);
    const above = layers[index];
    if (above) {
      if (!above.opener?.isConnected || layer.el.contains(above.opener)) {
        above.opener = layer.opener;
      }
    } else if (layer.opener?.isConnected) {
      layer.opener.focus();
    }
  }
</script>

<script lang="ts">
  let {
    el = $bindable(),
    open = $bindable(),
    onCancel,
    children,
    shape = "xl",
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
    const layer: Layer = { el, opener: focusedElement() };
    layers.push(layer);
    if (!el.open) el.showModal();
    events.on("keydown", isolateKeys);

    return () => {
      events.remove("keydown", isolateKeys);
      closeLayer(layer);
    };
  });
</script>

{#if open}
  <dialog
    bind:this={el}
    closedby="any"
    class={cn(
      "m-auto bg-m3-surface-container-high p-6 text-m3-on-surface shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-[2px] data-closing:backdrop:bg-transparent motion-safe:backdrop:transition-colors starting:backdrop:bg-transparent",
      baseClasses({ shape }),
      className,
    )}
    transition:scale={{
      duration: prefersReducedMotion.current ? 0 : 150,
      start: 0.95,
    }}
    {...mergeProps(restProps, {
      oncancel,
      onintrostart: () => el?.removeAttribute("data-closing"),
      onoutrostart: () => el?.setAttribute("data-closing", ""),
    })}
  >
    {@render children()}
  </dialog>
{/if}
