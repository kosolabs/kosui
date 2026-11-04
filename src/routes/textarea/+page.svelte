<script lang="ts">
  import {
    COLORS,
    INPUT_VARIANTS,
    SHAPES,
    SIZES,
    Textarea,
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
  import CommentExample from "./examples/comment.svelte";
  import commentSource from "./examples/comment.svelte?raw";
  import FeedbackExample from "./examples/feedback.svelte";
  import feedbackSource from "./examples/feedback.svelte?raw";

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
    Textareas let people write more than a line, like a comment, a message or a
    description.
  </p>

  <Playground>
    {#snippet component()}
      <Textarea
        bind:value
        {variant}
        {color}
        {size}
        {shape}
        {disabled}
        aria-invalid={invalid || undefined}
        aria-label="Description"
        placeholder="What needs to happen?"
        rows={3}
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
        component="Textarea"
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
          rows: 2,
        }}
        values={{
          variant,
          color,
          size,
          shape,
          disabled,
          "aria-invalid": invalid,
          "aria-label": "Description",
          placeholder: "What needs to happen?",
          rows: 3,
        }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Feedback" source={feedbackSource}>
      {#snippet description()}
        Name a textarea with a <code>&lt;label&gt;</code>. Native limits like
        <code>required</code> and <code>maxlength</code> work as they do on any
        textarea, and the count is linked with <code>aria-describedby</code>.
      {/snippet}
      <FeedbackExample />
    </Example>

    <Example title="Comment box" source={commentSource}>
      {#snippet description()}
        With <code>rows={"{1}"}</code>, a textarea is exactly as tall as an
        Input or Button of the same size, so it lines up in a row. The
        <code>field-sizing-content</code> class grows it with its text in browsers
        that support it.
      {/snippet}
      <CommentExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Textarea renders a native <code>&lt;textarea&gt;</code>. Give it a name
        with a <code>&lt;label&gt;</code> or <code>aria-label</code>; a
        placeholder isn't one.
      </li>
      <li>
        Textarea looks and behaves like Input: focus draws a 2-pixel outline in
        its color, its resting edge contrasts at least 3:1, and invalid
        textareas turn the error color, for native validation or
        <code>aria-invalid="true"</code>.
      </li>
      <li>
        Enter adds a new line. If Enter sends, as in a chat, say so nearby and
        keep a button that does the same.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "value",
          type: "string",
          description: "Bindable. The textarea's text.",
        },
        {
          name: "variant",
          type: `"outlined" | "filled" | "plain"`,
          default: `"outlined"`,
          description:
            "An outline, a fill with a bottom line, or no container for textareas that sit in their own surface.",
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
            "Text size and padding. One row is the shared row height: 28, 36, 44, 52 or 60 pixels.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
        },
        {
          name: "el",
          type: "HTMLTextAreaElement",
          description: "Bindable. The `<textarea>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the textarea. Your classes override the textarea's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;textarea&gt;</code>, including <code>rows</code>,
      <code>required</code>, <code>maxlength</code> and
      <code>disabled</code>.
    </p>
  </Section>
</div>
