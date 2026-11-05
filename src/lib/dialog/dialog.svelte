<script module lang="ts">
  import { mergeComponentProps } from "#lib/merge-props.js";
  import { Modal, type ModalProps } from "#lib/modal/index.js";
  import { cn } from "#lib/utils.js";
  import type { LucideIcon } from "@lucide/svelte";
  import type { Snippet } from "svelte";

  export type DialogProps<T> = {
    icon?: LucideIcon;
    title?: string;
    onSelect?: (value: T | undefined) => void;
    actions?: Snippet<[select: (value: T | undefined) => void]>;
  } & ModalProps;
</script>

<script lang="ts" generics="T">
  let {
    el = $bindable(),
    open = $bindable(),
    icon: Icon,
    title,
    onSelect,
    children,
    actions,
    class: className,
    ...restProps
  }: DialogProps<T> = $props();

  const id = $props.id();

  function select(value: T | undefined) {
    open = false;
    onSelect?.(value);
  }
</script>

<Modal
  bind:el
  bind:open
  class={cn("flex w-[min(calc(100%-1em),36em)] flex-col gap-4", className)}
  {...mergeComponentProps(
    Modal,
    {
      "aria-labelledby":
        title && !restProps["aria-label"] ? `${id}-title` : undefined,
      onCancel: () => onSelect?.(undefined),
    },
    restProps,
  )}
>
  {#if Icon}
    <Icon class="mx-auto text-m3-secondary" />
  {/if}
  {#if title}
    <h2 id="{id}-title" class={cn("text-2xl", Icon && "text-center")}>
      {title}
    </h2>
  {/if}
  <div class="text-sm text-m3-on-surface-variant">
    {@render children()}
  </div>
  {#if actions}
    <div class="mt-2 flex flex-wrap justify-end gap-2">
      {@render actions(select)}
    </div>
  {/if}
</Modal>
