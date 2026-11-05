<script lang="ts">
  import { Input } from "#lib/index.js";

  const TAKEN = ["ada", "grace", "linus"];

  const id = $props.id();
  let username = $state("ada");
  let taken = $derived(TAKEN.includes(username.trim().toLowerCase()));
</script>

<div class="flex w-full max-w-sm flex-col gap-1">
  <label for="{id}-username" class="text-sm font-medium">Username</label>
  <Input
    id="{id}-username"
    autocomplete="username"
    aria-invalid={taken}
    aria-describedby="{id}-message"
    bind:value={username}
  />
  <p
    id="{id}-message"
    class={["text-xs", taken ? "text-m3-error" : "text-m3-on-surface-variant"]}
  >
    {taken ? `${username} is taken. Try another.` : "Letters and numbers only."}
  </p>
</div>
