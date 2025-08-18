<script lang="ts">
  import { Dialoguer } from "$lib/index.js";

  let { children } = $props();
</script>

<Dialoguer>
  {@render children()}
</Dialoguer>
