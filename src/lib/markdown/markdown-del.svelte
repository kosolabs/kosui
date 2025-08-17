<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLDelAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Del> & HTMLDelAttributes = $props();
</script>

<del {...restProps}>
  {@render children()}
</del>
