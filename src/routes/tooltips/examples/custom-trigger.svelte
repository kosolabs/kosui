<script lang="ts">
  import { Tooltip } from "#lib/index.js";
</script>

<p class="text-sm">
  Shipping takes
  <Tooltip>
    {#snippet trigger(props)}
      <button
        {...props}
        type="button"
        class="cursor-help underline decoration-dotted underline-offset-4"
      >
        3–5 business days
      </button>
    {/snippet}
    Monday to Friday, excluding public holidays
  </Tooltip>
  after your order is confirmed.
</p>
