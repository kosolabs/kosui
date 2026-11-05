<script lang="ts">
  import { Button, Shortcut, ShortcutHint } from "#lib/index.js";

  const MODIFIERS = ["Alt", "Control", "Meta", "Shift"];

  let shortcut = $state(new Shortcut({ key: "k", mod: true }));
  let recording = $state(false);

  function onkeydown(event: KeyboardEvent) {
    if (!recording || MODIFIERS.includes(event.key)) return;
    event.preventDefault();
    if (event.key !== "Escape") {
      shortcut = Shortcut.fromEvent(event);
    }
    recording = false;
  }
</script>

<svelte:window {onkeydown} />

<div class="flex w-full max-w-sm items-center gap-3">
  <span class="flex-1 text-sm">Search shortcut</span>
  <span class="text-sm text-m3-on-surface-variant" aria-live="polite">
    {#if recording}
      Press keys…
    {:else}
      <ShortcutHint {shortcut} />
    {/if}
  </span>
  <Button variant="outlined" onclick={() => (recording = !recording)}>
    {recording ? "Cancel" : "Change"}
  </Button>
</div>
