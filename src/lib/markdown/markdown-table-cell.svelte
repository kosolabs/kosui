<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { MarkedToken, Tokens } from "marked";
  import {
    type HTMLTdAttributes,
    type HTMLThAttributes,
  } from "svelte/elements";
  import MarkdownTokens from "./markdown-tokens.svelte";

  let {
    token,
    ...restProps
  }: MarkdownComponentProps<Tokens.TableCell> &
    (HTMLThAttributes | HTMLTdAttributes) = $props();
</script>

<svelte:element this={token.header ? "th" : "td"} {...restProps}>
  <MarkdownTokens tokens={token.tokens as MarkedToken[]} />
</svelte:element>
