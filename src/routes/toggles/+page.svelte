<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    ToggleButton,
    ToggleGroup,
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
    ToggleButtonSetting,
  } from "#ui";
  import AlignmentExample from "./examples/alignment.svelte";
  import EqualWidthsExample from "./examples/equal-widths.svelte";
  import equalWidthsSource from "./examples/equal-widths.svelte?raw";
  import alignmentSource from "./examples/alignment.svelte?raw";
  import FormExample from "./examples/form.svelte";
  import formSource from "./examples/form.svelte?raw";
  import ThemeExample from "./examples/theme.svelte";
  import themeSource from "./examples/theme.svelte?raw";

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let view = $state("week");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Toggle groups let people pick one of a few options, like a view or a mode,
    from a row of connected buttons.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <ToggleGroup bind:value={view} {color} {size} {shape} aria-label="View">
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
        </ToggleGroup>
        <p class="text-sm" aria-live="polite">Showing the {view}</p>
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
    {/snippet}
    {#snippet code()}
      <Code
        component="ToggleGroup"
        components={["ToggleButton"]}
        bindables={["value"]}
        defaults={{
          color: "primary",
          size: "sm",
          shape: "full",
          "aria-label": "",
        }}
        values={{ color, size, shape, "aria-label": "View" }}
        children={`<ToggleButton value="day">Day</ToggleButton>
  <ToggleButton value="week">Week</ToggleButton>
  <ToggleButton value="month">Month</ToggleButton>`}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Icons and labels" source={themeSource}>
      {#snippet description()}
        Buttons take any content. Name the group with <code>aria-label</code>,
        and use <code>onChange</code> to act on a choice as it's made.
      {/snippet}
      <ThemeExample />
    </Example>

    <Example title="Icons only" source={alignmentSource}>
      {#snippet description()}
        Without visible text, name each button with <code>aria-label</code>; a
        <code>title</code> adds a hover hint.
      {/snippet}
      <AlignmentExample />
    </Example>

    <Example title="Equal widths" source={equalWidthsSource}>
      {#snippet description()}
        Buttons are as wide as their content. To make them all as wide as the
        widest, give the group <code
          >inline-grid auto-cols-fr grid-flow-col</code
        >; with <code>grid</code> and a width instead, they share the width equally.
      {/snippet}
      <EqualWidthsExample />
    </Example>

    <Example title="In a form" source={formSource}>
      {#snippet description()}
        With a <code>name</code>, the group submits its value with a form, like
        radio buttons.
      {/snippet}
      <FormExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        A toggle group is a <code>radiogroup</code> of native radio buttons. Tab moves
        into the group once, onto the chosen button, and the arrow keys move between
        buttons and choose them.
      </li>
      <li>
        Name the group with <code>aria-label</code> or
        <code>aria-labelledby</code>. A button is named by its content, or by
        its own <code>aria-label</code> when it shows only an icon.
      </li>
      <li>
        The chosen button fills with the group's color. In plain and inherit,
        it's tinted and outlined with a thicker edge in the text color.
      </li>
      <li>
        Focus draws a 2-pixel outline in the group's color, above the
        neighboring buttons.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl font-light">ToggleGroup</h3>
    <PropsTable
      rows={[
        {
          name: "value",
          type: "T",
          description: "Bindable. The chosen button's value.",
        },
        {
          name: "onChange",
          type: "(value: T) => void",
          description: "Called when someone chooses a button.",
        },
        {
          name: "name",
          type: "string",
          description:
            "The name the value submits under in a form. Without it, the group has a generated name.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the edges, the chosen button and focus.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, the same as a Button of that size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding at the group's two ends.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The group's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the group.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      group's <code>&lt;div&gt;</code>.
    </p>

    <h3 class="text-xl font-light">ToggleButton</h3>
    <PropsTable
      rows={[
        {
          name: "value",
          type: "T",
          description: "The value the group takes when this button is chosen.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The button's content.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The button's radio `<input>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the visible button, a `<label>` around the radio. Your classes override the button's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      radio <code>&lt;input&gt;</code>, including <code>disabled</code>,
      <code>aria-label</code> and <code>title</code>.
    </p>
  </Section>
</div>
