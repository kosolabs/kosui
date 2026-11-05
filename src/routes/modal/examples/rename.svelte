<script lang="ts">
  import { Button, Input, Modal } from "#lib/index.js";

  const id = $props.id();
  let open = $state(false);
  let name = $state("Quarterly plan");
  let draft = $state("");
</script>

<div class="flex flex-col items-center gap-3">
  <Button
    variant="tonal"
    onclick={() => {
      draft = name;
      open = true;
    }}
  >
    Rename
  </Button>
  <p class="text-sm" aria-live="polite">Project: {name}</p>
</div>

<Modal
  bind:open
  aria-labelledby="{id}-title"
  class="w-[min(calc(100%-1em),24em)]"
>
  <form
    class="flex flex-col gap-4"
    onsubmit={(event) => {
      event.preventDefault();
      name = draft.trim() || name;
      open = false;
    }}
  >
    <h2 id="{id}-title" class="text-xl">Rename project</h2>
    <label class="flex flex-col gap-1 text-sm">
      Name
      <Input bind:value={draft} autofocus required />
    </label>
    <div class="flex justify-end gap-2">
      <Button variant="text" onclick={() => (open = false)}>Cancel</Button>
      <Button type="submit" variant="filled">Save</Button>
    </div>
  </form>
</Modal>
