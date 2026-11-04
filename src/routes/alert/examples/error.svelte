<script lang="ts">
  import { Alert, Button } from "#lib/index.js";
  import { CircleAlert } from "@lucide/svelte";

  let failed = $state(false);
</script>

<div class="flex flex-col items-start gap-3">
  <Button variant="filled" onclick={() => (failed = true)}>Sign in</Button>
  {#if failed}
    <Alert color="error" class="flex items-center gap-3">
      <CircleAlert class="shrink-0" />
      <p class="flex-1">Sign-in failed. Check your connection and try again.</p>
      <Button variant="text" color="error" onclick={() => (failed = false)}>
        Dismiss
      </Button>
    </Alert>
  {/if}
</div>
