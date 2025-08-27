<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";

  let { token }: MarkdownComponentProps<Tokens.Escape> = $props();
</script>

{token.text}
