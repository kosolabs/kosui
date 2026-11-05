<script lang="ts">
  import { Button, Drawer, Switch } from "#lib/index.js";
  import { SlidersHorizontal } from "@lucide/svelte";

  const id = $props.id();
  let open = $state(false);
  let unread = $state(false);
  let attachments = $state(true);
  let applied = $state("");

  function apply(event: SubmitEvent) {
    event.preventDefault();
    applied = [unread && "unread", attachments && "with attachments"]
      .filter(Boolean)
      .join(", ");
    open = false;
  }
</script>

<div class="flex flex-col items-center gap-3">
  <Button
    icon={SlidersHorizontal}
    aria-haspopup="dialog"
    aria-expanded={open}
    onclick={() => (open = true)}
  >
    Filters
  </Button>
  <p class="text-sm" aria-live="polite">
    {applied ? `Showing ${applied}` : "Showing everything"}
  </p>
</div>

<Drawer bind:open side="end" aria-labelledby="{id}-title" class="p-6">
  <form class="flex h-full flex-col gap-4" onsubmit={apply}>
    <h2 id="{id}-title" class="text-xl">Filters</h2>
    <label class="flex items-center justify-between gap-3 text-sm">
      Unread only
      <Switch bind:checked={unread} />
    </label>
    <label class="flex items-center justify-between gap-3 text-sm">
      Has attachments
      <Switch bind:checked={attachments} />
    </label>
    <div class="mt-auto flex justify-end gap-2">
      <Button variant="plain" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="filled" type="submit">Apply</Button>
    </div>
  </form>
</Drawer>
