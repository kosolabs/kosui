<script module lang="ts">
  import { Button, type ButtonActionProps } from "#lib/button/index.js";
  import type { Snippet } from "svelte";

  export type DialogButtonProps<T> = {
    value: T | undefined;
    autofocus?: boolean;
    onSelect: (value: T | undefined) => void;
    children: Snippet;
  } & Omit<ButtonActionProps, "value">;
</script>

<script lang="ts" generics="T">
  let {
    value,
    onSelect,
    autofocus = false,
    children,
    ...restProps
  }: DialogButtonProps<T> = $props();
</script>

<Button onclick={() => onSelect(value)} {autofocus} {...restProps}>
  {@render children()}
</Button>
