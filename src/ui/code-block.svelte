<script lang="ts">
  import { Button } from "#lib/index.js";
  import { Check, Copy } from "@lucide/svelte";
  import { highlight } from "./highlight.js";

  export type CodeBlockProps = {
    code: string;
  };
  let { code }: CodeBlockProps = $props();

  let copied = $state(false);
  let timeout: ReturnType<typeof setTimeout>;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => (copied = false), 2000);
    } catch {
      copied = false;
    }
  }
</script>

<div class="code-block">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <pre>{@html highlight(code)}</pre>
  <Button
    class="copy"
    variant="plain"
    color="secondary"
    shape="circle"
    icon={copied ? Check : Copy}
    tooltip={copied ? "Copied" : "Copy code"}
    onclick={copy}
  />
</div>

<style>
  .code-block {
    position: relative;
  }

  pre {
    overflow-x: auto;
    padding-right: calc(var(--spacing) * 10);
  }

  .code-block :global(.copy) {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
