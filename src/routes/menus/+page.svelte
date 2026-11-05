<script lang="ts">
  import {
    Button,
    Menu,
    MenuDivider,
    MenuItem,
    SHAPES,
    type PopoverPlacement,
    type Shape,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import ActionsExample from "./examples/actions.svelte";
  import actionsSource from "./examples/actions.svelte?raw";
  import IconTriggerExample from "./examples/icon-trigger.svelte";
  import iconTriggerSource from "./examples/icon-trigger.svelte?raw";
  import ViewOptionsExample from "./examples/view-options.svelte";
  import viewOptionsSource from "./examples/view-options.svelte?raw";

  const PLACEMENTS = [
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
  ] as const;

  let placement: PopoverPlacement = $state("bottom-start");
  let shape: Shape = $state("xs");
  let last = $state("");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Menus offer a list of actions or choices from a button. Pass the button as
    the <code>trigger</code> snippet and the items as children.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex min-h-48 flex-col items-center justify-center gap-3">
        <Menu {placement} {shape}>
          {#snippet trigger(props)}
            <Button {...props} variant="tonal">Options</Button>
          {/snippet}
          <MenuItem onSelect={() => (last = "Renamed")}>Rename</MenuItem>
          <MenuItem onSelect={() => (last = "Duplicated")}>Duplicate</MenuItem>
          <MenuDivider />
          <MenuItem color="error" onSelect={() => (last = "Deleted")}>
            Delete
          </MenuItem>
        </Menu>
        <p class="text-sm" aria-live="polite">{last}</p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={placement}
        options={[...PLACEMENTS]}
        label="Placement"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Menu"
        components={["MenuItem", "MenuDivider", "Button"]}
        defaults={{ placement: "bottom-start", shape: "xs" }}
        values={{ placement, shape }}
        children={`{#snippet trigger(props)}
    <Button {...props}>Options</Button>
  {/snippet}
  <MenuItem onSelect={rename}>Rename</MenuItem>
  <MenuItem onSelect={duplicate}>Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem color="error" onSelect={remove}>Delete</MenuItem>`}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Checkable items and groups" source={viewOptionsSource}>
      {#snippet description()}
        A <code>checked</code> item shows a check mark and tells screen readers
        whether it's on. <code>MenuGroup</code> labels a set of items, and
        <code>MenuDivider</code> separates groups.
      {/snippet}
      <ViewOptionsExample />
    </Example>

    <Example title="Icon button trigger" source={iconTriggerSource}>
      {#snippet description()}
        The <code>trigger</code> snippet receives props to spread on any button, including
        an icon button named by its tooltip. Disabled items are skipped by the arrow
        keys.
      {/snippet}
      <IconTriggerExample />
    </Example>

    <Example title="From actions" source={actionsSource}>
      {#snippet description()}
        <code>MenuActions</code> builds items from the same
        <code>Action</code> objects as the command palette, grouped by category, with
        their shortcuts and a check mark for selected actions.
      {/snippet}
      <ActionsExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        The trigger gets <code>aria-haspopup</code> and
        <code>aria-expanded</code>, and the menu is named by the trigger. Give
        an icon-only trigger a name, for example with a tooltip.
      </li>
      <li>
        Enter, Space or Down Arrow on the trigger opens the menu on its first
        item, and Up Arrow on its last. A click opens it with focus on the menu,
        ready for the arrow keys.
      </li>
      <li>
        In the menu, the arrow keys, Home and End move between items, skipping
        disabled ones, and typing a letter jumps to the next item that starts
        with it. Enter or Space chooses an item.
      </li>
      <li>
        Escape closes the menu and returns focus to the trigger, and Tab closes
        it and moves on, as in the ARIA menu button pattern.
      </li>
      <li>
        Checked items are <code>menuitemcheckbox</code> with
        <code>aria-checked</code>, and a <code>MenuGroup</code> is a
        <code>group</code> labelled by its heading.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl">Menu</h3>
    <PropsTable
      rows={[
        {
          name: "trigger",
          type: "Snippet<[MenuTriggerProps]>",
          description:
            "The button that opens the menu. Spread the props it receives onto it.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "Menu items, groups and dividers.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the menu is showing.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"bottom-start"`,
          description:
            "Where the menu sits next to the trigger. It flips when there isn't room.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "The corner radius.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The menu element.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">MenuItem</h3>
    <PropsTable
      rows={[
        {
          name: "onSelect",
          type: "() => void",
          description:
            "Called when the item is chosen, after the menu closes and focus returns to the trigger.",
        },
        {
          name: "checked",
          type: "boolean",
          description:
            "Makes the item checkable, with a check mark when true. Leave it out for plain items.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"plain"`,
          description: "The text color. Use error for destructive actions.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Shows the item but can't be chosen or focused.",
        },
        {
          name: "el",
          type: "HTMLButtonElement",
          description: "Bindable. The item's `<button>`.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">MenuGroup, MenuDivider and MenuActions</h3>
    <PropsTable
      rows={[
        {
          name: "MenuGroup label",
          type: "string",
          description: "The heading shown above the group, which names it.",
        },
        {
          name: "MenuDivider",
          type: "HTMLAttributes<HTMLHRElement>",
          description: "A separator line between items or groups.",
        },
        {
          name: "MenuActions actions",
          type: "Action[]",
          description:
            "Renders a group of items for each category, in order, with dividers between them.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Other attributes and event handlers pass through to each component's
      element: the menu, the item's <code>&lt;button&gt;</code>, the group or
      the <code>&lt;hr&gt;</code>.
    </p>
  </Section>
</div>
