<script lang="ts">
  import { Avatar, Badge } from "#lib/index.js";
  import { Crown } from "@lucide/svelte";
</script>

<Badge variant="filled" color="tertiary" class="px-0.5" title="Premium member">
  <Avatar>AL</Avatar>
  {#snippet content()}
    <Crown size={12} aria-hidden="true" />
  {/snippet}
</Badge>
