<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAttributes } from "svelte/elements";

  let {
    token,
    ...restProps
  }: MarkdownComponentProps<Tokens.Codespan> & HTMLAttributes<HTMLElement> =
    $props();
</script>

<code {...restProps}>
  {token.raw.slice(1, token.raw.length - 1)}
</code>
