<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLImgAttributes } from "svelte/elements";

  let {
    token,
    ...restProps
  }: MarkdownComponentProps<Tokens.Image> & HTMLImgAttributes = $props();
</script>

<img src={token.href} title={token.title} alt={token.text} {...restProps} />
