<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    children,
    token: _token,
    ...restProps
  }: MarkdownComponentProps<Tokens.Paragraph> &
    HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p {...restProps}>
  {@render children()}
</p>
