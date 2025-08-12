<script lang="ts">
  import type { Snippet } from "svelte";

  export type UsageProps = {
    component?: Snippet<[]>;
    controls?: Snippet<[]>;
    code?: Snippet<[]>;
  };
  let { component, controls, code }: UsageProps = $props();
</script>

<div class="rounded-md border">
  <div class="flex max-md:flex-col">
    {#if component}
      <div class="flex flex-1 items-center justify-center p-4">
        {@render component()}
      </div>
    {/if}
    {#if controls}
      <div class="p-4 max-md:border-t md:border-l">
        {@render controls()}
      </div>
    {/if}
  </div>
  {#if code}
    <div class="rounded-b-md border-t bg-m3-surface-container p-4">
      {@render code()}
    </div>
  {/if}
</div>
