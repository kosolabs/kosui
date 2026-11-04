<script lang="ts">
  import { Button, Chip, Input } from "#lib/index.js";

  let recipients = $state(["ada@example.com", "grace@example.com"]);
  let draft = $state("");
  let sent = $state("");

  function add(event: KeyboardEvent) {
    if (event.key === "Enter" && draft.trim()) {
      event.preventDefault();
      recipients.push(draft.trim());
      draft = "";
    }
  }
</script>

<form
  class="flex w-full max-w-md flex-col gap-3"
  onsubmit={(event) => {
    event.preventDefault();
    sent = `Sent to ${recipients.length}`;
  }}
>
  <Input
    bind:value={draft}
    placeholder="Add a recipient and press Enter"
    aria-label="Add a recipient"
    onkeydown={add}
  />
  <div class="flex flex-wrap gap-2" aria-label="Recipients" role="group">
    {#each recipients as recipient (recipient)}
      <Chip
        variant="tonal"
        color="secondary"
        shape="circle"
        onDelete={() => recipients.splice(recipients.indexOf(recipient), 1)}
      >
        {recipient}
      </Chip>
    {/each}
  </div>
  <div class="flex items-center gap-3">
    <Button type="submit" variant="filled">Send</Button>
    <span class="text-sm" aria-live="polite">{sent}</span>
  </div>
</form>
