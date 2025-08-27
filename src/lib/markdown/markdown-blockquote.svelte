<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";
  import type { HTMLQuoteAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Blockquote> & HTMLQuoteAttributes = $props();
</script>

<blockquote {...restProps}>
  {@render children()}
</blockquote>
