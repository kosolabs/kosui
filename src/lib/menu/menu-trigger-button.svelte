<script lang="ts" module>
  import { Button, type ButtonProps } from "$lib/button/index.js";
  import { getMenuContext } from "$lib/menu/index.js";
  import { mergeProps } from "$lib/merge-props.js";
  import { Shortcut } from "$lib/shortcut/index.js";

  export type MenuTriggerButtonProps = {} & ButtonProps;
</script>

<script lang="ts">
  let { ...restProps }: MenuTriggerButtonProps = $props();

  const ctx = getMenuContext();
</script>

<Button
  bind:el={ctx.anchorEl}
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
/>
