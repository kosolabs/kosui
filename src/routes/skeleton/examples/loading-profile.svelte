<script lang="ts">
  import { Avatar, Button, Skeleton } from "#lib/index.js";

  let loading = $state(true);

  function reload() {
    loading = true;
    setTimeout(() => (loading = false), 2000);
  }

  reload();
</script>

<div class="flex flex-col items-start gap-4">
  <div
    aria-busy={loading}
    aria-label="Profile"
    role="region"
    class="flex w-72 items-center gap-3"
  >
    {#if loading}
      <Skeleton shape="full" class="size-9 shrink-0" />
      <div class="flex flex-1 flex-col gap-1 text-sm">
        <Skeleton class="w-2/3" />
        <Skeleton class="w-full" />
      </div>
    {:else}
      <Avatar class="shrink-0">AL</Avatar>
      <div class="flex flex-col gap-1 text-sm">
        <span class="font-medium">Ada Lovelace</span>
        <span class="text-m3-on-surface-variant">ada@example.com</span>
      </div>
    {/if}
  </div>
  <Button variant="text" onclick={reload} disabled={loading}>Reload</Button>
</div>
