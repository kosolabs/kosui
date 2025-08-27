<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    token,
    ...restProps
  }: MarkdownComponentProps<Tokens.Code> & HTMLAttributes<HTMLPreElement> =
    $props();
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<pre {...restProps}><code class={token.lang}>{@html token.text}</code></pre>
