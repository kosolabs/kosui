<script lang="ts">
  import { Fab } from "#lib/index.js";
  import { Plus } from "@lucide/svelte";
</script>

<div
  class="flex h-64 w-full max-w-md flex-col overflow-auto rounded-lg bg-m3-surface-container-highest p-4"
>
  <ul aria-label="Tasks">
    {#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
      <li class="py-1">Task {n}</li>
    {/each}
  </ul>
  <Fab icon={Plus} tooltip="New task" />
</div>
