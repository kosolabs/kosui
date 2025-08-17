<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";

  let { token }: MarkdownComponentProps<Tokens.HTML | Tokens.Tag> = $props();
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html token.text}
