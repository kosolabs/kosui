<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLLiAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.ListItem> & HTMLLiAttributes = $props();
</script>

<li {...restProps}>
  {@render children()}
</li>
