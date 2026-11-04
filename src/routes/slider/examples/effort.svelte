<script lang="ts">
  import { Slider } from "#lib/index.js";

  const LEVELS = ["None", "Low", "Medium", "High", "Max"];

  const id = $props.id();
  let effort = $state(2);
</script>

<div class="flex w-full max-w-sm flex-col gap-2 pt-8">
  <label for="{id}-effort" class="text-sm font-medium">Effort</label>
  <Slider
    id="{id}-effort"
    bind:value={effort}
    min={0}
    max={LEVELS.length - 1}
    marks={LEVELS.map((label, value) => ({ value, label }))}
    format={(v) => LEVELS[v]}
    color="tertiary"
    size="md"
  />
</div>
