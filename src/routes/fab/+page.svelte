<script>
  import { Fab } from "$lib/fab";
  import { Plus } from "@lucide/svelte";
</script>

<div class="flex flex-wrap gap-2">
  <div
    class="flex h-96 flex-1 flex-col rounded-lg bg-m3-surface-container-highest p-2"
  >
    <Fab icon={Plus} />
  </div>

  <div
    class="flex h-96 flex-1 flex-col rounded-lg bg-m3-surface-container-highest p-2"
  >
    <Fab icon={Plus}>New Task</Fab>
  </div>

  <div
    class="flex h-96 flex-1 flex-col overflow-scroll rounded-lg bg-m3-surface-container-highest p-2"
  >
    {#each [...Array(20).keys()] as i (i)}
      <div class="text-nowrap">
        Very wide content {i} that overflows the div by being very long
      </div>
    {/each}
    <Fab icon={Plus} />
  </div>

  <div
    class="flex h-96 flex-1 flex-col overflow-scroll rounded-lg bg-m3-surface-container-highest p-2"
  >
    {#each [...Array(20).keys()] as i (i)}
      <div class="text-nowrap">
        Very wide content {i} that overflows the div by being very long
      </div>
    {/each}
    <Fab icon={Plus}>New Task</Fab>
  </div>

  <div
    class="h-96 w-full overflow-scroll rounded-lg bg-m3-surface-container-highest p-2"
  >
    {#each [...Array(20).keys()] as i (i)}
      <div class="text-nowrap">
        Very wide content {i} that overflows the div by being very long
      </div>
    {/each}
    <Fab icon={Plus} />
  </div>

  <div
    class="h-96 w-full overflow-scroll rounded-lg bg-m3-surface-container-highest p-2"
  >
    {#each [...Array(20).keys()] as i (i)}
      <div class="text-nowrap">
        Very wide content {i} that overflows the div by being very long
      </div>
    {/each}
    <Fab icon={Plus}>New Task</Fab>
  </div>
</div>
