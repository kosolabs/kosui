<script lang="ts">
  import { Dialoguer } from "$lib/dialog";

  let { children } = $props();
</script>

<Dialoguer>
  {@render children()}
</Dialoguer>
