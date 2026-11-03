<script lang="ts">
  import { Button, Input } from "#lib/index.js";

  let email = $state("");
  let subscribed = $state("");

  function subscribe(event: SubmitEvent) {
    event.preventDefault();
    subscribed = email;
  }
</script>

<form class="flex flex-wrap gap-2" onsubmit={subscribe}>
  <Input
    type="email"
    aria-label="Email"
    placeholder="you@example.com"
    required
    bind:value={email}
  />
  <Button type="submit" variant="filled">Subscribe</Button>
</form>
{#if subscribed}
  <p class="w-full text-center text-sm">Subscribed {subscribed}</p>
{/if}
