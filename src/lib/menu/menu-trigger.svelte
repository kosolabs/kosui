<script lang="ts" module>
  import type { Variants } from "$lib/base.js";
  import { getMenuContext } from "$lib/menu/index.js";
  import { mergeProps } from "$lib/merge-props.js";
  import { Shortcut } from "$lib/shortcut/index.js";
  import type { ClassName } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type MenuTriggerProps = {
    children?: Snippet;
  } & ClassName &
    Variants &
    HTMLButtonAttributes;
</script>

<script lang="ts">
  let { children, class: className, ...restProps }: MenuTriggerProps = $props();

  const ctx = getMenuContext();
</script>

<button
  bind:this={ctx.anchorEl}
  class={twMerge(className)}
  {...mergeProps(
    {
      onclick: () => (ctx.open = !ctx.open),
      onkeydown: (event: KeyboardEvent) => {
        if (Shortcut.ENTER.matches(event) || Shortcut.SPACE.matches(event)) {
          event.stopImmediatePropagation();
        }
      },
      "aria-haspopup": "menu",
      "aria-expanded": ctx.open,
    },
    restProps,
  )}
>
  {@render children?.()}
</button>
