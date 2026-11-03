<script lang="ts">
  import { Button, type ButtonProps } from "#lib/index.js";

  let { el = $bindable(), ...props }: ButtonProps = $props();
</script>

<Button bind:el variant="filled" {...props} />
