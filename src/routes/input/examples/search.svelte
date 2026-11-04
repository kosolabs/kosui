<script lang="ts">
  import { Input } from "#lib/index.js";

  const TASKS = [
    "Write the release notes",
    "Review the design language",
    "Fix the flaky badge test",
    "Plan the input audit",
  ];

  let query = $state("");
  let matches = $derived(
    TASKS.filter((task) => task.toLowerCase().includes(query.toLowerCase())),
  );
</script>

<div class="flex max-w-sm flex-col gap-3">
  <Input
    type="search"
    variant="filled"
    aria-label="Search tasks"
    placeholder="Search tasks"
    bind:value={query}
  />
  <ul class="flex flex-col gap-1 text-sm">
    {#each matches as task (task)}
      <li>{task}</li>
    {:else}
      <li class="text-m3-on-surface-variant">No tasks match.</li>
    {/each}
  </ul>
</div>
