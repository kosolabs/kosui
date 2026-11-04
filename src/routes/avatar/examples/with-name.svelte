<script lang="ts">
  import { Avatar } from "#lib/index.js";
  import { asset } from "$app/paths";
</script>

<div class="flex items-center gap-3">
  <Avatar src={asset("avatar-example.svg")} />
  <div class="flex flex-col">
    <span class="text-sm font-medium">Ada Lovelace</span>
    <span class="text-sm text-m3-on-surface-variant">ada@example.com</span>
  </div>
</div>
