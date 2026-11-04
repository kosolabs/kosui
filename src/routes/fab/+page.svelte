<script lang="ts">
  import {
    COLORS,
    Fab,
    Link,
    SHAPES,
    VARIANTS,
    type Color,
    type FabProps,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    DisabledSetting,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Plus } from "@lucide/svelte";
  import PlacementExample from "./examples/placement.svelte";
  import placementSource from "./examples/placement.svelte?raw";

  const CONTENTS = ["icon", "both"];

  let variant: Variant = $state("elevated");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
  let content = $state("icon");
  let tooltip = $state(true);
  let disabled = $state(false);
  let presses = $state(0);

  let hasLabel = $derived(content === "both");
  let tooltipText = $derived(tooltip ? "New task" : "");
  let ariaLabel = $derived(!hasLabel && !tooltip ? "New task" : "");

  let fabProps: FabProps = $derived({
    variant,
    color,
    shape,
    disabled,
    icon: Plus,
    tooltip: tooltipText || undefined,
    "aria-label": ariaLabel || undefined,
    onclick: () => presses++,
  });
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    A floating action button (Fab) holds the main action on a screen, like
    creating a task. It's a <Link href={resolve("button")}>Button</Link> with more
    presence: elevated by default, with a larger icon and padding. Give it a label
    to make an extended Fab.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        {#if hasLabel}
          <Fab {...fabProps}>New task</Fab>
        {:else}
          <Fab {...fabProps} />
        {/if}
        <p class="text-sm" aria-live="polite">
          Pressed {presses}
          {presses === 1 ? "time" : "times"}
        </p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={variant}
        options={[...VARIANTS]}
        label="Variant"
      />
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
      <ToggleButtonSetting
        bind:value={content}
        options={CONTENTS}
        label="Content"
      />
      <SwitchSetting label="Tooltip" bind:value={tooltip} />
      <DisabledSetting bind:disabled />
    {/snippet}
    {#snippet code()}
      <Code
        component="Fab"
        defaults={{
          variant: "elevated",
          color: "primary",
          shape: "rounded",
          tooltip: "",
          "aria-label": "",
          disabled: false,
        }}
        values={{
          variant,
          color,
          shape,
          tooltip: tooltipText,
          "aria-label": ariaLabel,
          disabled,
        }}
        expressions={{ icon: "Plus" }}
        imports={[`import { Plus } from "@lucide/svelte";`]}
        children={hasLabel ? "New task" : undefined}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Placing a Fab" source={placementSource}>
      {#snippet description()}
        Fab doesn't position itself, so it works in any layout. Pin it to a
        scrolling region with <code>absolute</code> inside a
        <code>relative</code> container that doesn't scroll, as here, or to the
        window with <code>fixed right-4 bottom-4</code>.
      {/snippet}
      <PlacementExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Fab renders a native <code>&lt;button&gt;</code>, so Enter and Space
        activate it. With an <code>href</code>, it renders a native
        <code>&lt;a&gt;</code> instead.
      </li>
      <li>
        Give an icon-only Fab a name, with a string <code>tooltip</code> or an
        <code>aria-label</code>.
      </li>
      <li>
        Place the Fab where it falls in the reading order you want. Positioning
        it with CSS moves it on screen but not in the tab order.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"elevated"`,
          description: "How much attention the Fab draws.",
        },
        {
          name: "size",
          type: "number",
          default: "20",
          description: "The icon's size in pixels.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Fab takes every other Button prop, including <code>color</code>,
      <code>shape</code>, <code>href</code>, <code>icon</code> and
      <code>tooltip</code>, with the same defaults. Every attribute, event
      handler and attachment passes through to the rendered element.
    </p>
  </Section>
</div>
