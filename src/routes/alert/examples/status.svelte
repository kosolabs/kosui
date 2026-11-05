<script lang="ts">
  import { Alert, Button } from "#lib/index.js";

  let saved = $state(false);
</script>

<div class="flex flex-col items-center gap-3">
  <Button onclick={() => (saved = true)}>Save draft</Button>
  {#if saved}
    <Alert role="status" variant="outlined" color="secondary">
      Draft saved.
    </Alert>
  {/if}
</div>
