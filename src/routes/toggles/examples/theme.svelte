<script lang="ts">
  import { ToggleButton, ToggleGroup } from "#lib/index.js";
  import { Monitor, Moon, Sun } from "@lucide/svelte";

  let theme = $state("system");
  let changes = $state(0);
  let summary = $derived(
    `Theme: ${theme} (${changes} ${changes === 1 ? "change" : "changes"})`,
  );
</script>

<div class="flex flex-col items-start gap-3">
  <ToggleGroup
    bind:value={theme}
    onChange={() => changes++}
    aria-label="Theme"
    color="secondary"
  >
    <ToggleButton value="light"><Sun size={16} /> Light</ToggleButton>
    <ToggleButton value="dark"><Moon size={16} /> Dark</ToggleButton>
    <ToggleButton value="system"><Monitor size={16} /> System</ToggleButton>
  </ToggleGroup>
  <p class="text-sm">{summary}</p>
</div>
