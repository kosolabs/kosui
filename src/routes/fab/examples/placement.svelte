<script lang="ts">
  import { Fab } from "#lib/index.js";
  import { Plus } from "@lucide/svelte";
</script>

<div
  class="relative h-64 w-full max-w-md rounded-lg bg-m3-surface-container-highest"
>
  <ul class="h-full overflow-auto p-4" aria-label="Tasks">
    {#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
      <li class="py-1">Task {n}</li>
    {/each}
  </ul>
  <Fab icon={Plus} tooltip="New task" class="absolute right-4 bottom-4" />
</div>
