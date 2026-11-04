<script lang="ts">
  import { Button, Switch } from "#lib/index.js";

  let submitted: string | undefined = $state();
</script>

<form
  class="flex max-w-md flex-col gap-3"
  onsubmit={(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submitted = [...data.keys()].join(", ") || "nothing";
  }}
>
  <label class="flex items-center gap-3 text-sm">
    <Switch name="public" />
    Make the project public
  </label>
  <label class="flex items-center gap-3 text-sm">
    <Switch name="terms" required />
    I agree to the terms (required)
  </label>
  <Button type="submit" variant="filled" class="self-start">Save</Button>
  {#if submitted}
    <p role="status" class="text-sm">Submitted: {submitted}</p>
  {/if}
</form>
