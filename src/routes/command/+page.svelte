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
  import { Example, Playground, PropsTable, Section } from "#ui";
  import { Command, Keyboard, Link, Moon, Sun } from "@lucide/svelte";
  import PageActionsExample from "./examples/page-actions.svelte";
  import pageActionsSource from "./examples/page-actions.svelte?raw";

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
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    A command palette searches every action in the app and runs one from the
    keyboard. Register <code>Action</code>s in a <code>Registry</code>, and
    <code>CommandPalette</code> lists them and runs their keyboard shortcuts.
  </p>

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
        <Input aria-label="Notes" placeholder="Typing ? here doesn't run it" />
        <p class="text-sm" aria-live="polite">
          Theme: {theme}{log && ` · ${log}`}
        </p>
        <CommandPalette bind:open {registry} />
      </div>
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Registering actions" source={pageActionsSource}>
      {#snippet description()}
        <code>register</code> returns a function that unregisters, so return it
        from an <code>$effect</code> to offer an action only while a component
        or condition is active. Create one <code>Registry</code> for the app and share
        it through context.
      {/snippet}
      <PageActionsExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        The palette is a modal dialog named by <code>label</code>. Its search
        field is a <code>combobox</code> that controls a <code>listbox</code> of actions,
        and the first match is highlighted.
      </li>
      <li>
        Down and Up Arrow move the highlight and wrap, Enter or a click runs it,
        and Escape closes the palette and returns focus to where it was.
      </li>
      <li>
        Actions with a <code>selected</code> state show a check mark and set
        <code>aria-checked</code>. Disabled actions are left out.
      </li>
      <li>
        Shortcuts without Ctrl, Alt or Command don't run while someone is typing
        in a text field, so a shortcut like <kbd>?</kbd> doesn't interrupt typing.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl">CommandPalette</h3>
    <PropsTable
      rows={[
        {
          name: "registry",
          type: "Registry",
          description:
            "The actions to list. Their shortcuts run whenever the palette is mounted.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the palette is showing.",
        },
        {
          name: "query",
          type: "string",
          default: `""`,
          description:
            "Bindable. The search text, cleared when the palette closes.",
        },
        {
          name: "label",
          type: "string",
          default: `"Command palette"`,
          description: "The dialog's accessible name.",
        },
        {
          name: "placeholder",
          type: "string",
          default: `"Search commands"`,
          description: "The search field's placeholder and name.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">Action</h3>
    <PropsTable
      rows={[
        { name: "id", type: "string", description: "Unique id." },
        {
          name: "callback",
          type: "() => void",
          description: "Runs the action, after the palette closes.",
        },
        {
          name: "name",
          type: "string",
          default: "id",
          description: "The label in the palette and menus.",
        },
        {
          name: "category",
          type: "string",
          description:
            "Shown before the name, matched by search, and used to group MenuActions.",
        },
        {
          name: "description",
          type: "string",
          default: "name",
          description: "Matched by search and shown as a tooltip.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          default: "CircleSlash",
          description: "Shown before the name.",
        },
        {
          name: "shortcut",
          type: "Shortcut",
          description: "A key combination that runs the action.",
        },
        {
          name: "enabled",
          type: "() => boolean",
          description: "When false, the action is hidden and its shortcut off.",
        },
        {
          name: "selected",
          type: "() => boolean",
          description: "Makes the action checkable, with a check when true.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">Registry</h3>
    <PropsTable
      rows={[
        {
          name: "register",
          type: "(...actions: Action[]) => () => void",
          description:
            "Adds actions and returns a function that removes them. Ids and shortcuts must be unique.",
        },
        {
          name: "unregister",
          type: "(...actions: Action[]) => void",
          description: "Removes actions.",
        },
        {
          name: "call",
          type: "(id: string) => void",
          description: "Runs an action by id.",
        },
        {
          name: "actions",
          type: "Action[]",
          description: "Every registered action, newest first.",
        },
      ]}
    />
  </Section>
</div>
