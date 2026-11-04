<script lang="ts">
  import { Button, Link, Tooltip } from "#lib/index.js";
  import { Info } from "@lucide/svelte";
</script>

<div class="flex items-center gap-1 text-sm">
  Estimate: 5 points
  <Tooltip click rich placement="bottom-start">
    {#snippet trigger(props)}
      <Button
        {...props}
        icon={Info}
        variant="plain"
        size="xs"
        aria-label="About estimates"
      />
    {/snippet}
    <p class="max-w-56">
      Points measure effort, not time.
      <Link href="https://en.wikipedia.org/wiki/Story_point">
        Read about story points
      </Link>
    </p>
  </Tooltip>
</div>
