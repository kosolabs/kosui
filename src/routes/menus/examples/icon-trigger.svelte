<script lang="ts">
  import { Button, Menu, MenuItem } from "#lib/index.js";
  import { EllipsisVertical } from "@lucide/svelte";

  let last = $state("");
</script>

<div class="flex items-center gap-3">
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
  <span class="text-sm" aria-live="polite">{last}</span>
</div>
