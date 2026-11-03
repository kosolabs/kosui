<script module lang="ts">
  import { events } from "#lib/index.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { Shortcut } from "#lib/shortcut/index.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import { scale } from "svelte/transition";

  export type ModalProps = {
    el?: HTMLDialogElement;
    onCancel?: () => void;
    children: Snippet;
  } & ClassName &
    HTMLDialogAttributes;
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

  function handleKeydown(event: KeyboardEvent) {
    if (Shortcut.ESCAPE.matches(event)) {
      open = false;
      onCancel?.();
      event.preventDefault();
    }
    event.stopImmediatePropagation();
  }

  function handleClickOutside(event: MouseEvent) {
    if (el && el === event.target) {
      const rect = el.getBoundingClientRect();
      if (
        event.clientY < rect.top ||
        event.clientY > rect.top + rect.height ||
        event.clientX < rect.left ||
        event.clientX > rect.left + rect.width
      ) {
        open = false;
        onCancel?.();
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  }

  $effect(() => {
    if (el) {
      el.showModal();
      events.on("keydown", handleKeydown);
      events.on("mousedown", handleClickOutside);

      return () => {
        events.remove("keydown", handleKeydown);
        events.remove("mousedown", handleClickOutside);
      };
    }
  });
</script>

{#if open}
  <dialog
    bind:this={el}
    class={cn("m-auto rounded-lg p-5 shadow-lg", className)}
    transition:scale={{ duration: 150, start: 0.95 }}
    {...mergeProps(restProps, {
      onintrostart: () => {
        if (el) {
          el.classList.remove("backdrop-out");
          el.classList.add("backdrop-in");
        }
      },
      onoutrostart: () => {
        if (el) {
          el.classList.remove("backdrop-in");
          el.classList.add("backdrop-out");
        }
      },
    })}
  >
    {@render children()}
  </dialog>
{/if}

<style>
  .backdrop-in::backdrop {
    animation: backdrop-in 150ms forwards;
  }

  .backdrop-out::backdrop {
    animation: backdrop-out 150ms forwards;
  }

  @keyframes backdrop-in {
    from {
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
    }
    to {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }
  }

  @keyframes backdrop-out {
    from {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }
    to {
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
    }
  }
</style>
