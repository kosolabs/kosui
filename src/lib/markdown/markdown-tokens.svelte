<script lang="ts">
  import { MarkdownToken } from "$lib/markdown/index.js";
  import { type MarkedToken } from "marked";

  export type MarkdownTokensProps = {
    tokens: MarkedToken[];
  };
  let { tokens }: MarkdownTokensProps = $props();
</script>

{#each tokens as token (token)}
  <MarkdownToken {token} />
{/each}
