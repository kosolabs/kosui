<script lang="ts">
  import { Button, Popover, Switch } from "#lib/index.js";
  import { SlidersHorizontal } from "@lucide/svelte";

  const id = $props.id();
  let open = $state(false);
  let anchorEl: HTMLElement | undefined = $state();
  let showDone = $state(true);
  let showArchived = $state(false);
</script>

<div class="flex flex-col items-start gap-3">
  <Button
    bind:el={anchorEl}
    icon={SlidersHorizontal}
    aria-expanded={open}
    aria-controls="{id}-panel"
    onclick={() => (open = !open)}
  >
    View options
  </Button>
  <Popover
    bind:open
    {anchorEl}
    id="{id}-panel"
    placement="bottom-start"
    role="dialog"
    aria-label="View options"
    class="flex flex-col gap-3 rounded-md border bg-m3-surface-container p-4 text-sm shadow"
  >
    <label class="flex items-center justify-between gap-6">
      Show done tasks
      <Switch bind:checked={showDone} />
    </label>
    <label class="flex items-center justify-between gap-6">
      Show archived tasks
      <Switch bind:checked={showArchived} />
    </label>
  </Popover>
  <p class="text-sm">
    Showing {showDone ? "done" : "no done"} and {showArchived
      ? "archived"
      : "no archived"} tasks
  </p>
</div>
