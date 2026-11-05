<script lang="ts">
  import { Action, Button, CommandPalette, Registry } from "#lib/index.js";
  import { Archive, FilePlus, Search } from "@lucide/svelte";

  const registry = new Registry();
  let open = $state(false);
  let showArchive = $state(false);
  let log = $state("");

  $effect(() =>
    registry.register(
      new Action({
        id: "new-file",
        category: "File",
        name: "New file",
        icon: FilePlus,
        callback: () => (log = "Created a file"),
      }),
      new Action({
        id: "find",
        category: "Edit",
        name: "Find",
        icon: Search,
        callback: () => (log = "Finding"),
      }),
    ),
  );

  $effect(() => {
    if (!showArchive) return;
    return registry.register(
      new Action({
        id: "archive",
        category: "File",
        name: "Archive",
        icon: Archive,
        callback: () => (log = "Archived"),
      }),
    );
  });
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="tonal" onclick={() => (open = true)}>Commands</Button>
  <Button variant="plain" onclick={() => (showArchive = !showArchive)}>
    {showArchive ? "Hide" : "Show"} archive
  </Button>
  <span class="text-sm" aria-live="polite">{log}</span>
</div>

<CommandPalette bind:open {registry} />
