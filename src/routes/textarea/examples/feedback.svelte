<script lang="ts">
  import { Button, Textarea } from "#lib/index.js";

  const MAX = 280;

  const id = $props.id();
  let feedback = $state("");
  let sent = $state(false);
</script>

<form
  class="flex max-w-md flex-col gap-1"
  onsubmit={(event) => {
    event.preventDefault();
    sent = true;
  }}
>
  <label for="{id}-feedback" class="text-sm font-medium">Feedback</label>
  <Textarea
    id="{id}-feedback"
    rows={4}
    required
    maxlength={MAX}
    aria-describedby="{id}-count"
    bind:value={feedback}
  />
  <p id="{id}-count" class="text-xs text-m3-on-surface-variant">
    {feedback.length} of {MAX} characters
  </p>
  <Button type="submit" variant="filled" class="mt-2 self-start">Send</Button>
  {#if sent}
    <p role="status" class="text-sm">Thanks for the feedback.</p>
  {/if}
</form>
