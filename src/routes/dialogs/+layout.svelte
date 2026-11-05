<script lang="ts">
  import { DialogProvider } from "#lib/index.js";

  let { children } = $props();
</script>

<DialogProvider>
  {@render children()}
</DialogProvider>
