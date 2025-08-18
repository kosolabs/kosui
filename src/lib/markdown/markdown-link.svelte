<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAnchorAttributes } from "svelte/elements";

  let {
    token,
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Link> & HTMLAnchorAttributes = $props();
</script>

<a href={token.href} title={token.title} {...restProps}>
  {@render children()}
</a>
