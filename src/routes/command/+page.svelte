<script lang="ts">
  import {
    Action,
    Button,
    CommandPalette,
    Input,
    Registry,
    Shortcut,
    ShortcutHint,
  } from "#lib/index.js";
  import { DocPage, Playground } from "#ui";
  import { Command, Keyboard, Link, Moon, Sun } from "@lucide/svelte";

  const registry = new Registry();
  let open = $state(false);
  let theme = $state("light");
  let log = $state("");

  const shortcuts = {
    palette: new Shortcut({ key: "k", mod: true }),
    copyLink: new Shortcut({ key: "l", alt: true }),
    help: new Shortcut({ key: "?", shift: true }),
  };

  $effect(() =>
    registry.register(
      new Action({
        id: "palette",
        category: "View",
        name: "Command palette",
        icon: Command,
        shortcut: shortcuts.palette,
        callback: () => (open = true),
      }),
      new Action({
        id: "copy-link",
        category: "Share",
        name: "Copy link",
        description: "Copies a link to this page",
        icon: Link,
        shortcut: shortcuts.copyLink,
        callback: () => (log = "Copied link"),
      }),
      new Action({
        id: "shortcuts",
        category: "Help",
        name: "Keyboard shortcuts",
        icon: Keyboard,
        shortcut: shortcuts.help,
        callback: () => (log = "Showed shortcuts"),
      }),
      new Action({
        id: "light",
        category: "Theme",
        name: "Light",
        icon: Sun,
        selected: () => theme === "light",
        callback: () => (theme = "light"),
      }),
      new Action({
        id: "dark",
        category: "Theme",
        name: "Dark",
        icon: Moon,
        selected: () => theme === "dark",
        callback: () => (theme = "dark"),
      }),
      new Action({
        id: "paste",
        category: "Edit",
        name: "Paste",
        enabled: () => false,
        callback: () => (log = "Pasted"),
      }),
    ),
  );
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <Button variant="tonal" onclick={() => (open = true)}>
            Open command palette
          </Button>
          <p class="flex items-center gap-1 text-sm">
            Or press <ShortcutHint shortcut={shortcuts.palette} />,
            <ShortcutHint shortcut={shortcuts.copyLink} /> or
            <ShortcutHint shortcut={shortcuts.help} />
          </p>
          <Input
            aria-label="Notes"
            placeholder="Typing ? here doesn't run it"
          />
          <p class="text-sm" aria-live="polite">
            Theme: {theme}{log && ` · ${log}`}
          </p>
          <CommandPalette bind:open {registry} />
        </div>
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
