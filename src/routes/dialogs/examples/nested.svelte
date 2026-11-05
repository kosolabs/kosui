<script lang="ts">
  import { Button, Dialog, Input } from "#lib/index.js";

  const id = $props.id();
  let open = $state(false);
  let confirming = $state(false);
  let name = $state("Ada Lovelace");
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
    Edit profile
  </Button>
  <p class="text-sm" aria-live="polite">Name: {name}</p>
</div>

<Dialog bind:open title="Edit profile">
  <form
    id="{id}-form"
    onsubmit={(event) => {
      event.preventDefault();
      name = draft;
      open = false;
    }}
  >
    <label class="flex flex-col gap-1">
      Name
      <Input bind:value={draft} required />
    </label>
  </form>
  {#snippet actions()}
    <Button
      variant="plain"
      onclick={() => {
        if (draft === name) open = false;
        else confirming = true;
      }}
    >
      Cancel
    </Button>
    <Button type="submit" form="{id}-form" variant="filled">Save</Button>
  {/snippet}
</Dialog>

<Dialog
  bind:open={confirming}
  title="Discard changes?"
  onSelect={(discard) => {
    if (discard) open = false;
  }}
>
  Your edits to the profile will be lost.
  {#snippet actions(select)}
    <Button variant="plain" onclick={() => select(false)}>Keep editing</Button>
    <Button variant="filled" onclick={() => select(true)}>Discard</Button>
  {/snippet}
</Dialog>
