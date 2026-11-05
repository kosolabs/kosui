<script lang="ts">
  import type { Snippet } from "svelte";
  import CodeBlock from "./code-block.svelte";
  import { exampleCode } from "./docs.js";

  export type ExampleProps = {
    title: string;
    source: string;
    description?: Snippet;
    children: Snippet;
  };
  let { title, source, description, children }: ExampleProps = $props();

  let code = $derived(exampleCode(source));
</script>

<div class="flex flex-col gap-2">
  <h3 class="text-lg">{title}</h3>
  {#if description}
    <div class="max-w-prose text-m3-on-surface-variant">
      {@render description()}
    </div>
  {/if}
  <div class="rounded-md border">
    <div class="flex flex-wrap items-center justify-center gap-2 p-6">
      {@render children()}
    </div>
    <div class="rounded-b-md border-t bg-m3-surface-container p-4 text-sm">
      <CodeBlock {code} />
    </div>
  </div>
</div>
