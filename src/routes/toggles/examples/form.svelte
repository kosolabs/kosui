<script lang="ts">
  import { Button, ToggleButton, ToggleGroup } from "#lib/index.js";

  const id = $props.id();
  let submitted: string | undefined = $state();
</script>

<form
  class="flex flex-col items-start gap-3"
  onsubmit={(event) => {
    event.preventDefault();
    submitted = new FormData(event.currentTarget).get("billing")?.toString();
  }}
>
  <span id="{id}-billing" class="text-sm font-medium">Billing</span>
  <ToggleGroup name="billing" value="monthly" aria-labelledby="{id}-billing">
    <ToggleButton value="monthly">Monthly</ToggleButton>
    <ToggleButton value="yearly">Yearly</ToggleButton>
  </ToggleGroup>
  <Button type="submit" variant="filled">Continue</Button>
  {#if submitted}
    <p role="status" class="text-sm">Submitted billing={submitted}</p>
  {/if}
</form>
