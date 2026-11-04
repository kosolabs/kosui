<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    Slider,
    type Color,
    type Shape,
    type Size,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import EffortExample from "./examples/effort.svelte";
  import effortSource from "./examples/effort.svelte?raw";
  import VolumeExample from "./examples/volume.svelte";
  import volumeSource from "./examples/volume.svelte?raw";

  const MARKS = [
    { value: 0, label: "0%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let withMarks = $state(false);
  let showValue = $state(false);
  let disabled = $state(false);
  let value = $state(30);
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Sliders let people pick a number from a range by dragging, like a volume or
    a price limit.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex w-full max-w-sm flex-col items-center gap-3 pt-8">
        <Slider
          bind:value
          {color}
          {size}
          {shape}
          {showValue}
          {disabled}
          marks={withMarks ? MARKS : []}
          format={(v) => `${v}%`}
          aria-label="Brightness"
        />
        <p class="text-sm">Brightness {value}%</p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
      <SwitchSetting label="Marks" bind:value={withMarks} />
      <SwitchSetting label="Show value" bind:value={showValue} />
      <SwitchSetting label="Disabled" bind:value={disabled} />
    {/snippet}
    {#snippet code()}
      <Code
        component="Slider"
        bindables={["value"]}
        defaults={{
          color: "primary",
          size: "sm",
          shape: "full",
          showValue: false,
          disabled: false,
          "aria-label": "",
        }}
        values={{
          color,
          size,
          shape,
          showValue,
          disabled,
          "aria-label": "Brightness",
        }}
        expressions={{
          marks: withMarks
            ? `[{ value: 0, label: "0%" }, { value: 50, label: "50%" }, { value: 100, label: "100%" }]`
            : undefined,
          format: "(v) => `${v}%`",
        }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Volume" source={volumeSource}>
      {#snippet description()}
        Name a slider with <code>aria-label</code> or a
        <code>&lt;label&gt;</code>. Use <code>oninput</code> to follow the value
        as it moves and <code>onchange</code> to act when someone lets go.
      {/snippet}
      <VolumeExample />
    </Example>

    <Example title="Steps with marks" source={effortSource}>
      {#snippet description()}
        A <code>step</code> and labeled <code>marks</code> turn a slider into a
        short scale. <code>format</code> gives each value a name, which screen readers
        announce instead of the number.
      {/snippet}
      <EffortExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Slider renders a native <code>&lt;input type="range"&gt;</code>. Arrow
        keys move it by a step, Page Up and Page Down by larger jumps, and Home
        and End to the ends.
      </li>
      <li>
        Give it a name with a <code>&lt;label&gt;</code> or
        <code>aria-label</code>. <code>format</code> also sets
        <code>aria-valuetext</code>, so screen readers announce "40%" or
        "Medium" rather than a bare number.
      </li>
      <li>
        The thumb and filled track use the slider's color, including plain and
        inherit, and keyboard focus draws an outline around the thumb.
      </li>
      <li>
        Marks and the value label are decoration; the input's value text carries
        their meaning.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "value",
          type: "number",
          description:
            "Bindable. The chosen number. Without one, a slider starts in the middle, as a native range input does.",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "The smallest value.",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "The largest value.",
        },
        {
          name: "step",
          type: `number | "any"`,
          default: "1",
          description: "The increment between values.",
        },
        {
          name: "marks",
          type: "{ value: number; label?: string }[]",
          description: "Dots on the track, with optional labels below.",
        },
        {
          name: "format",
          type: "(value: number) => string",
          description:
            "Turns the value into text for the value label and for screen readers.",
        },
        {
          name: "showValue",
          type: "boolean",
          default: "false",
          description:
            "Always show the value label. Otherwise it shows while someone hovers, drags or focuses the slider with the keyboard.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the thumb and the filled track.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The thumb, 12 to 28 pixels, on an input 20 to 36 pixels tall that sits inside the shared row.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding, for the track and the thumb.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The `<input>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the slider's wrapper, which also holds the marks and value label. Use it to set the width.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;input&gt;</code>, including <code>name</code>,
      <code>disabled</code>, <code>oninput</code> and <code>onchange</code>.
    </p>
  </Section>
</div>
