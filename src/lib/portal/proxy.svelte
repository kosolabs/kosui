<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type ProxyProps = { children?: Snippet };
</script>

<script lang="ts">
  const { children }: ProxyProps = $props();
</script>

{#if children}
  {@render children()}
{/if}
