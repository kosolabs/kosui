<script lang="ts">
  import { Button, Tooltip, type PopoverPlacement } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import ButtonsExample from "./examples/buttons.svelte";
  import buttonsSource from "./examples/buttons.svelte?raw";
  import ClickExample from "./examples/click.svelte";
  import clickSource from "./examples/click.svelte?raw";
  import CustomTriggerExample from "./examples/custom-trigger.svelte";
  import customTriggerSource from "./examples/custom-trigger.svelte?raw";

  const PLACEMENTS = ["top", "right", "bottom", "left"] as const;

  let placement: PopoverPlacement = $state("top");
  let rich = $state(false);
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Tooltips show a short label or description when someone hovers over or
    focuses an element. Buttons take one directly with their
    <code>tooltip</code> prop.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex min-h-40 items-center justify-center">
        <Tooltip {placement} {rich}>
          {#snippet trigger(props)}
            <Button {...props} variant="tonal">Archive</Button>
          {/snippet}
          Moves the project out of your list. You can restore it later.
        </Tooltip>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={placement}
        options={[...PLACEMENTS]}
        label="Placement"
      />
      <SwitchSetting label="Rich" bind:value={rich} />
    {/snippet}
    {#snippet code()}
      <Code
        component="Tooltip"
        defaults={{ placement: "top", rich: false }}
        values={{ placement, rich }}
        children={`{#snippet trigger(props)}
    <Button {...props}>Archive</Button>
  {/snippet}
  Moves the project out of your list. You can restore it later.`}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Buttons" source={buttonsSource}>
      {#snippet description()}
        A string <code>tooltip</code> names an icon-only button and describes a
        button with a label. A snippet <code>tooltip</code> can hold richer content.
      {/snippet}
      <ButtonsExample />
    </Example>

    <Example title="Any element" source={customTriggerSource}>
      {#snippet description()}
        The <code>trigger</code> snippet receives props to spread on any
        element. Use one that takes keyboard focus, like a
        <code>&lt;button&gt;</code>, so keyboard users can reach the tooltip
        too.
      {/snippet}
      <CustomTriggerExample />
    </Example>

    <Example title="Click to show" source={clickSource}>
      {#snippet description()}
        With <code>click</code>, the trigger toggles the tooltip like a
        disclosure, with <code>aria-expanded</code>, and its content comes next
        in the tab order, so it can hold a link.
      {/snippet}
      <ClickExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        A tooltip shows after a short delay when the pointer rests on its
        trigger, and right away when the trigger gets keyboard focus. While it's
        open, the trigger's <code>aria-describedby</code> points at it.
      </li>
      <li>
        The pointer can move onto a tooltip without it closing, and Escape
        closes it, as WCAG's Content on Hover or Focus requires.
      </li>
      <li>
        Hover works with a mouse or pen on any device, including touchscreen
        laptops; on touch, a long press shows it.
      </li>
      <li>
        Hover tooltips can't be reached with the keyboard, so keep their content
        to text. For links or actions, use <code>click</code>, or a Popover.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "trigger",
          type: "Snippet<[TooltipTriggerProps]>",
          description:
            "The element the tooltip belongs to. Spread the props it receives onto that element.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The tooltip's content.",
        },
        {
          name: "click",
          type: "boolean",
          default: "false",
          description:
            "Show and hide on click instead of hover and focus, like a disclosure.",
        },
        {
          name: "rich",
          type: "boolean",
          default: "false",
          description: "A larger surface for more than a short label.",
        },
        {
          name: "delay",
          type: "number",
          default: "500",
          description: "Milliseconds the pointer rests before it shows.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"top"`,
          description: "Where the tooltip goes. It flips to stay on screen.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the tooltip is showing.",
        },
        {
          name: "anchorEl",
          type: "HTMLElement",
          description:
            "The element to sit next to when there's no trigger snippet; show and hide it yourself with show(), hide() and cancel().",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the tooltip.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Tooltip takes every Popover prop. Every other attribute passes through to
      the tooltip's <code>&lt;div&gt;</code>.
    </p>
  </Section>
</div>
