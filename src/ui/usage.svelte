<script lang="ts">
  import hljs from "highlight.js";
  import svelte from "highlight.svelte";
  import { type Snippet } from "svelte";
  import "./theme.css";

  hljs.registerLanguage("svelte", svelte);

  export type UsageProps = {
    component?: Snippet<[]>;
    controls?: Snippet<[]>;
    code?: string;
  };
  let { component, controls, code: source }: UsageProps = $props();

  let code = $derived(
    hljs.highlight(source ?? "", { language: "svelte" }).value,
  );
</script>

<div class="rounded-md border">
  <div class="flex max-md:flex-col">
    {#if component}
      <div
        class="flex flex-1 items-center justify-center p-4"
        data-testid="preview"
      >
        {@render component()}
      </div>
    {/if}
    {#if controls}
      <div class="flex flex-col gap-2 p-4 max-md:border-t md:border-l">
        {@render controls()}
      </div>
    {/if}
  </div>
  <div class="rounded-b-md border-t bg-m3-surface-container p-4 text-sm">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <pre>{@html code}</pre>
  </div>
</div>
