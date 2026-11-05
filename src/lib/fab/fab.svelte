<script lang="ts">
  import { Button, type ButtonProps } from "#lib/button/index.js";
  import { cn } from "#lib/utils.js";
  import type { Attachment } from "svelte/attachments";

  export type FabProps = ButtonProps & {
    clear?: boolean;
  };

  let {
    el = $bindable(),
    class: className,
    style,
    size = "lg",
    shape = "lg",
    variant = "elevated",
    clear = false,
    ...restProps
  }: FabProps = $props();

  let width = $state(0);
  let height = $state(0);

  const measure: Attachment<HTMLElement> = (node) => {
    const observer = new ResizeObserver(() => {
      width = node.offsetWidth;
      height = node.offsetHeight;
    });
    observer.observe(node, { box: "border-box" });
    return () => observer.disconnect();
  };
</script>

<Button
  bind:el
  class={cn(
    "sticky top-[calc(100%-var(--fab-height))] bottom-0 left-[calc(100%-var(--fab-width))] flex transition",
    restProps.children && "w-fit",
    !clear && "-mt-(--fab-height)",
    className,
  )}
  style="--fab-width: {width}px; --fab-height: {height}px; {style ?? ''}"
  {variant}
  {size}
  {shape}
  {...restProps}
  {@attach measure}
/>
