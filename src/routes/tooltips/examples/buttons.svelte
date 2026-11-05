<script lang="ts">
  import { Button, Shortcut, ShortcutHint } from "#lib/index.js";
  import { Copy, Send } from "@lucide/svelte";

  const send = new Shortcut({ key: "Enter", shift: true });
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button icon={Copy} variant="plain" tooltip="Copy link" />
  <Button variant="tonal" tooltip="Saves a copy you can edit">Duplicate</Button>
  <Button icon={Send} variant="filled">
    Send
    {#snippet tooltip()}
      <span class="flex items-center gap-2">
        Send now
        <ShortcutHint shortcut={send} />
      </span>
    {/snippet}
  </Button>
</div>
