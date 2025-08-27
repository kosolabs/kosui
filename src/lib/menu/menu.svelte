<script module lang="ts">
  import { MenuContext, setMenuContext } from "$lib/menu/index.js";
  import type { ElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  export type MenuProps = {
    open?: boolean;
    children: Snippet;
  } & ElementRef;
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    children,
    el = $bindable(),
  }: MenuProps = $props();

  setMenuContext(
    new MenuContext(
      () => open,
      (value) => (open = value),
      () => el,
      (value) => (el = value),
    ),
  );
</script>

{@render children()}
