<script module lang="ts">
  import { Button, type ButtonProps } from "$lib/button/index.js";
  import { type Snippet } from "svelte";

  export type DialogButtonProps<T> = {
    value: T | undefined;
    autofocus?: boolean;
    onSelect: (value: T | undefined) => void;
    children: Snippet;
  } & Omit<ButtonProps, "value">;
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
