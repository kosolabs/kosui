<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Strong> & HTMLAttributes<HTMLElement> =
    $props();
</script>

<strong {...restProps}>
  {@render children()}
</strong>
