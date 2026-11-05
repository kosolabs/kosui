<script lang="ts">
  import { Button, Input } from "#lib/index.js";

  let email = $state("");
  let subscribed = $state("");

  function subscribe(event: SubmitEvent) {
    event.preventDefault();
    subscribed = email;
  }
</script>

<form class="flex flex-col items-center gap-3" onsubmit={subscribe}>
  <div class="flex flex-wrap justify-center gap-2">
    <Input
      type="email"
      aria-label="Email"
      placeholder="you@example.com"
      required
      bind:value={email}
    />
    <Button type="submit" variant="filled">Subscribe</Button>
  </div>
  <p class="text-sm" aria-live="polite">
    {subscribed ? `Subscribed ${subscribed}` : "Not subscribed yet"}
  </p>
</form>
