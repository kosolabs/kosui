<script lang="ts">
  import { Button, Input } from "#lib/index.js";

  const id = $props.id();
  let email = $state("");
  let subscribed = $state("");
</script>

<form
  class="flex max-w-sm flex-col gap-1"
  onsubmit={(event) => {
    event.preventDefault();
    subscribed = email;
  }}
>
  <label for="{id}-email" class="text-sm font-medium">Email</label>
  <Input
    id="{id}-email"
    type="email"
    autocomplete="email"
    required
    aria-describedby="{id}-hint"
    bind:value={email}
  />
  <p id="{id}-hint" class="text-xs text-m3-on-surface-variant">
    We'll send the newsletter here.
  </p>
  <Button type="submit" variant="filled" class="mt-2 self-start">
    Subscribe
  </Button>
  {#if subscribed}
    <p role="status" class="text-sm">Subscribed {subscribed}.</p>
  {/if}
</form>
