<script lang="ts">
  import { Button, Popover } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import FilterExample from "./examples/filter.svelte";
  import filterSource from "./examples/filter.svelte?raw";

  const PLACEMENTS = ["top", "right", "bottom", "left"] as const;

  let placement: (typeof PLACEMENTS)[number] = $state("bottom");
  let open = $state(false);
  let anchorEl: HTMLElement | undefined = $state();
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Popovers float content next to the element that opened it, above the rest of
    the page. Tooltip, Menu and Autocomplete are built on Popover; use it
    directly for anything else, like a small panel of settings.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex min-h-48 items-center justify-center">
        <Button
          bind:el={anchorEl}
          variant="tonal"
          aria-expanded={open}
          onclick={() => (open = !open)}
        >
          Details
        </Button>
        <Popover
          bind:open
          {anchorEl}
          {placement}
          role="dialog"
          aria-label="Details"
          class="max-w-56 rounded-md border bg-m3-surface-container p-3 text-sm shadow"
        >
          Due Friday. Three tasks left, one blocked on review.
        </Popover>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={placement}
        options={[...PLACEMENTS]}
        label="Placement"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Popover"
        bindables={["open"]}
        defaults={{ placement: "top" }}
        values={{ placement }}
        expressions={{ anchorEl: "trigger" }}
        children="Due Friday. Three tasks left, one blocked on review."
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Settings panel" source={filterSource}>
      {#snippet description()}
        For interactive content, give the popover <code>role="dialog"</code>
        and a name, and give its trigger <code>aria-expanded</code> and
        <code>aria-controls</code>. Escape closes it and returns focus to the
        trigger, and a click outside closes it.
      {/snippet}
      <FilterExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Popover renders in the browser's top layer with the Popover API, so it
        sits above everything without moving in the DOM. Place it right after
        its trigger, so it comes next in the tab order.
      </li>
      <li>
        Popover adds no role. Give it one that matches its content:
        <code>dialog</code> for a panel of controls, or use Tooltip, Menu or Autocomplete,
        which set their own.
      </li>
      <li>
        Escape closes the most recently opened popover and moves focus back to
        its anchor. Clicking outside the popover and its anchor closes it.
      </li>
      <li>Popovers don't animate when reduced motion is requested.</li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the popover is showing. Escape and clicks outside set it to false.",
        },
        {
          name: "anchorEl",
          type: "HTMLElement",
          description:
            "The element the popover sits next to, and gets focus back on Escape.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"top"`,
          description:
            "Where the popover goes, positioned with CSS anchor positioning. It flips to the other side and shifts along the edge to stay on screen.",
        },
        {
          name: "onKeydownWhileOpen",
          type: "(event: KeyboardEvent) => void",
          description:
            "Called for every key pressed anywhere while the popover is open, for keyboard navigation like a menu's.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The popover's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the popover. It has no styles of its own beyond the browser's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The popover's content.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      popover's <code>&lt;div&gt;</code>, and clicks inside it bubble like any
      other element's.
    </p>
  </Section>
</div>
