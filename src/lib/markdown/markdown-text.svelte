<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";

  let { children }: MarkdownComponentProps<Tokens.Text> = $props();
</script>

{@render children()}
