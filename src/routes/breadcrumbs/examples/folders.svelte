<script lang="ts">
  import { Breadcrumbs } from "#lib/index.js";
  import { ChevronRight } from "@lucide/svelte";
</script>

<div class="w-64 rounded-md border p-3">
  <Breadcrumbs
    path={[
      { title: "My Drive", href: "#drive" },
      { title: "Archive", href: "#archive" },
      { title: "2025", href: "#archive-2025" },
      { title: "Archive", href: "#archive-2025-archive" },
    ]}
  >
    {#snippet separator()}
      <ChevronRight size={14} />
    {/snippet}
  </Breadcrumbs>
</div>
