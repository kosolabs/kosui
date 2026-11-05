<script lang="ts">
  import {
    Avatar,
    Box,
    Button,
    Chip,
    Input,
    Slider,
    Switch,
    ToggleButton,
    ToggleGroup,
  } from "#lib/index.js";
  import { Check } from "@lucide/svelte";

  let title = $state("Ship the new docs");
  let labels = $state(["Docs", "Design"]);
  let priority = $state("high");
  let points = $state(5);
  let notify = $state(true);
  let created = $state(false);
</script>

<Box
  variant="elevated"
  shape="xl"
  class="flex w-full max-w-md flex-col gap-5 p-6"
  aria-label="Example: new task"
  role="group"
>
  <h2 class="text-xl">New task</h2>
  <label class="flex flex-col gap-1 text-sm">
    Title
    <Input bind:value={title} />
  </label>
  <div class="flex items-center gap-3">
    <Avatar class="bg-m3-tertiary-container text-m3-on-tertiary-container">
      AL
    </Avatar>
    <div class="flex flex-col">
      <span class="text-sm">Ada Lovelace</span>
      <span class="text-xs text-m3-on-surface-variant">Assignee</span>
    </div>
  </div>
  <div class="flex flex-wrap gap-2" aria-label="Labels" role="group">
    {#each labels as label (label)}
      <Chip
        onDelete={() => (labels = labels.filter((other) => other !== label))}
      >
        {label}
      </Chip>
    {/each}
  </div>
  <div class="flex flex-col gap-1 text-sm">
    <span id="priority-label">Priority</span>
    <ToggleGroup bind:value={priority} aria-labelledby="priority-label">
      <ToggleButton value="low">Low</ToggleButton>
      <ToggleButton value="medium">Medium</ToggleButton>
      <ToggleButton value="high">High</ToggleButton>
    </ToggleGroup>
  </div>
  <label class="flex flex-col gap-1 text-sm">
    Estimate: {points} points
    <Slider bind:value={points} min={1} max={13} />
  </label>
  <label class="flex items-center justify-between gap-3 text-sm">
    Notify the assignee
    <Switch bind:checked={notify} />
  </label>
  <div class="flex items-center justify-end gap-2">
    <span class="mr-auto flex items-center gap-1 text-sm" role="status">
      {#if created}
        <Check size={16} /> Created
      {/if}
    </span>
    <Button variant="plain" onclick={() => (created = false)}>Cancel</Button>
    <Button variant="filled" onclick={() => (created = true)}>
      Create task
    </Button>
  </div>
</Box>
