<script lang="ts">
  import { Button, type ButtonProps } from "#lib/button/index.js";
  import { cn } from "#lib/utils.js";
  import type { Attachment } from "svelte/attachments";

  export type FabProps = ButtonProps;

  let {
    el = $bindable(),
    class: className,
    style,
    size = 20,
    variant = "elevated",
    ...restProps
  }: FabProps = $props();

  let width = $state(0);

  const measureWidth: Attachment<HTMLElement> = (node) => {
    const observer = new ResizeObserver(() => {
      width = node.offsetWidth;
    });
    observer.observe(node, { box: "border-box" });
    return () => observer.disconnect();
  };
</script>

<Button
  bind:el
  class={cn(
    "sticky bottom-0 left-[calc(100%-var(--fab-width))] mt-auto ml-auto flex w-fit p-4",
    className,
  )}
  style="--fab-width: {width}px; {style ?? ''}"
  {variant}
  {size}
  {...restProps}
  {@attach measureWidth}
/>
