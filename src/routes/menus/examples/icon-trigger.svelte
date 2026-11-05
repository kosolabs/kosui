<script lang="ts">
  import { Button, Menu, MenuItem } from "#lib/index.js";
  import { EllipsisVertical } from "@lucide/svelte";

  let last = $state("No action yet");
</script>

<div class="flex flex-col items-center gap-3">
  <div class="flex items-center gap-1">
    <span class="text-sm">Quarterly plan</span>
    <Menu placement="bottom-end">
      {#snippet trigger(props)}
        <Button
          {...props}
          variant="plain"
          icon={EllipsisVertical}
          tooltip="More actions"
        />
      {/snippet}
      <MenuItem onSelect={() => (last = "Shared")}>Share</MenuItem>
      <MenuItem onSelect={() => (last = "Archived")}>Archive</MenuItem>
      <MenuItem disabled>Move to…</MenuItem>
    </Menu>
  </div>
  <p class="text-sm" aria-live="polite">{last}</p>
</div>
