<script lang="ts">
  import { ToggleButton, ToggleGroup } from "#lib/index.js";

  let priority = $state("medium");
  let period = $state("week");
</script>

<div class="flex w-full max-w-md flex-col items-start gap-4">
  <ToggleGroup
    bind:value={priority}
    aria-label="Priority"
    class="inline-grid auto-cols-fr grid-flow-col"
  >
    <ToggleButton value="low">Low</ToggleButton>
    <ToggleButton value="medium">Medium</ToggleButton>
    <ToggleButton value="high">High</ToggleButton>
  </ToggleGroup>

  <ToggleGroup
    bind:value={period}
    aria-label="Period"
    class="grid w-full auto-cols-fr grid-flow-col"
  >
    <ToggleButton value="day">Day</ToggleButton>
    <ToggleButton value="week">Week</ToggleButton>
    <ToggleButton value="month">Month</ToggleButton>
    <ToggleButton value="year">Year</ToggleButton>
  </ToggleGroup>
</div>
