<script lang="ts">
  import { Box, Button } from "#lib/index.js";

  const id = $props.id();
</script>

<Box
  variant="elevated"
  shape="rounded"
  role="region"
  aria-labelledby="{id}-title"
  class="flex max-w-sm flex-col gap-2 p-4"
>
  <h3 id="{id}-title" class="text-lg font-medium">Weekly report</h3>
  <p class="text-sm">12 tasks done, 3 in progress and 1 blocked.</p>
  <Button variant="tonal" class="self-end">Open report</Button>
</Box>
