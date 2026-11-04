<script lang="ts">
  import {
    COLORS,
    Input,
    INPUT_VARIANTS,
    SHAPES,
    SIZES,
    type Color,
    type InputVariant,
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
  import CheckedByAppExample from "./examples/checked-by-app.svelte";
  import checkedByAppSource from "./examples/checked-by-app.svelte?raw";
  import FormFieldExample from "./examples/form-field.svelte";
  import formFieldSource from "./examples/form-field.svelte?raw";
  import SearchExample from "./examples/search.svelte";
  import searchSource from "./examples/search.svelte?raw";

  let variant: InputVariant = $state("outlined");
  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("xs");
  let disabled = $state(false);
  let invalid = $state(false);
  let value = $state("");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Inputs let people type a single line of text, like a name, an email address
    or a search.
  </p>

  <Playground>
    {#snippet component()}
      <Input
        bind:value
        {variant}
        {color}
        {size}
        {shape}
        {disabled}
        aria-invalid={invalid || undefined}
        aria-label="Email"
        placeholder="you@example.com"
      />
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={variant}
        options={[...INPUT_VARIANTS]}
        label="Variant"
      />
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
      <SwitchSetting label="Disabled" bind:value={disabled} />
      <SwitchSetting label="Invalid" bind:value={invalid} />
    {/snippet}
    {#snippet code()}
      <Code
        component="Input"
        bindables={["value"]}
        defaults={{
          variant: "outlined",
          color: "primary",
          size: "sm",
          shape: "xs",
          disabled: false,
          "aria-invalid": false,
          "aria-label": "",
          placeholder: "",
        }}
        values={{
          variant,
          color,
          size,
          shape,
          disabled,
          "aria-invalid": invalid,
          "aria-label": "Email",
          placeholder: "you@example.com",
        }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Form field" source={formFieldSource}>
      {#snippet description()}
        Name an input with a <code>&lt;label&gt;</code>, and connect a hint with
        <code>aria-describedby</code>. Native validation, like
        <code>required</code> and <code>type="email"</code>, shows in the error
        color once someone has edited the field or tried to submit.
      {/snippet}
      <FormFieldExample />
    </Example>

    <Example title="Checked by your app" source={checkedByAppSource}>
      {#snippet description()}
        For errors your app finds, like a username that's taken, set
        <code>aria-invalid="true"</code> and point
        <code>aria-describedby</code> at the message.
      {/snippet}
      <CheckedByAppExample />
    </Example>

    <Example title="Search" source={searchSource}>
      {#snippet description()}
        Without a visible label, name the input with <code>aria-label</code>. A
        placeholder isn't a name: it disappears as soon as someone types.
      {/snippet}
      <SearchExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Input renders a native <code>&lt;input&gt;</code>. Give it a name with a
        <code>&lt;label&gt;</code> or <code>aria-label</code>; a placeholder
        isn't one.
      </li>
      <li>
        Focus draws a 2-pixel outline in the input's color, in every variant and
        color.
      </li>
      <li>
        At rest, the outlined variant's outline and the filled variant's bottom
        line contrast at least 3:1 with the input's background.
      </li>
      <li>
        Invalid inputs turn the error color: after someone edits a field that
        fails native validation, or whenever <code>aria-invalid</code> is
        <code>"true"</code>. Describe the error in text too, and connect it with
        <code>aria-describedby</code>.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "value",
          type: "string | number",
          description: "Bindable. The input's value.",
        },
        {
          name: "variant",
          type: `"outlined" | "filled" | "plain"`,
          default: `"outlined"`,
          description:
            "An outline, a fill with a bottom line, or no container for inputs that sit in their own surface.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the focus outline.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, with text to match. Inputs line up with buttons of the same size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
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
            "Classes for the input. Your classes override the input's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;input&gt;</code>, including <code>type</code>,
      <code>required</code>, <code>disabled</code> and
      <code>autocomplete</code>.
    </p>
  </Section>
</div>
