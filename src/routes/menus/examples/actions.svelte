<script lang="ts">
  import { Action, Button, Menu, MenuActions, Shortcut } from "#lib/index.js";
  import { Copy, Moon, Scissors, Sun } from "@lucide/svelte";

  let theme = $state("light");
  let last = $state("");

  const actions = [
    new Action({
      id: "cut",
      category: "Edit",
      name: "Cut",
      icon: Scissors,
      shortcut: new Shortcut({ key: "x", mod: true }),
      callback: () => (last = "Cut"),
    }),
    new Action({
      id: "copy",
      category: "Edit",
      name: "Copy",
      icon: Copy,
      shortcut: new Shortcut({ key: "c", mod: true }),
      callback: () => (last = "Copied"),
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
  ];
</script>

<div class="flex flex-col items-center gap-3">
  <Menu>
    {#snippet trigger(props)}
      <Button {...props}>Actions</Button>
    {/snippet}
    <MenuActions {actions} />
  </Menu>
  <p class="text-sm" aria-live="polite">
    Theme: {theme}{last && ` · ${last}`}
  </p>
</div>
