<script lang="ts">
  import { Button, CircularProgress } from "#lib/index.js";

  let saving = $state(false);

  async function save() {
    if (saving) return;
    saving = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    saving = false;
  }
</script>

<Button variant="filled" aria-busy={saving} onclick={save}>
  {#if saving}
    <CircularProgress size="xs" color="inherit" aria-hidden="true" />
  {/if}
  {saving ? "Saving…" : "Save"}
</Button>
