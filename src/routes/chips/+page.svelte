<script lang="ts">
  import {
    Button,
    Chip,
    COLORS,
    SHAPES,
    SIZES,
    VARIANTS,
    type Color,
    type Shape,
    type Size,
    type Variant,
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
  import RecipientsExample from "./examples/recipients.svelte";
  import recipientsSource from "./examples/recipients.svelte?raw";
  import TagsExample from "./examples/tags.svelte";
  import tagsSource from "./examples/tags.svelte?raw";

  const LABELS = ["Design", "Frontend", "Urgent"];

  let variant: Variant = $state("filled");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
  let size: Size = $state("sm");
  let clickable = $state(false);
  let deletable = $state(true);
  let labels = $state([...LABELS]);
  let last = $state("");

  let actions = $derived({
    onClick: clickable
      ? (label: string) => () => (last = `Clicked ${label}`)
      : undefined,
    onDelete: deletable
      ? (label: string) => () => {
          labels.splice(labels.indexOf(label), 1);
          last = `Removed ${label}`;
        }
      : undefined,
  });
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Chips show short pieces of information, like tags or the recipients of a
    message. They can be clicked, removed, or both.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <div class="flex flex-wrap justify-center gap-2">
          {#each labels as label (label)}
            <Chip
              {variant}
              {color}
              {shape}
              {size}
              onClick={actions.onClick?.(label)}
              onDelete={actions.onDelete?.(label)}
            >
              {label}
            </Chip>
          {/each}
        </div>
        {#if labels.length < LABELS.length}
          <Button variant="text" onclick={() => (labels = [...LABELS])}>
            Restore chips
          </Button>
        {/if}
        <p class="text-sm" aria-live="polite">{last}</p>
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
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
      <SwitchSetting label="Clickable" bind:value={clickable} />
      <SwitchSetting label="Deletable" bind:value={deletable} />
    {/snippet}
    {#snippet code()}
      <Code
        component="Chip"
        defaults={{
          variant: "filled",
          color: "primary",
          shape: "rounded",
          size: "sm",
        }}
        values={{ variant, color, shape, size }}
        expressions={{
          onClick: clickable ? "() => open(tag)" : undefined,
          onDelete: deletable ? "() => remove(tag)" : undefined,
        }}
        children={"{tag}"}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Recipients" source={recipientsSource}>
      {#snippet description()}
        Removable chips work inside forms without submitting them. Each remove
        button is named after its chip, and Backspace or Delete removes a
        focused chip.
      {/snippet}
      <RecipientsExample />
    </Example>

    <Example title="Tags" source={tagsSource}>
      {#snippet description()}
        Without <code>onClick</code> or <code>onDelete</code>, a chip is plain
        text and stays out of the tab order. A <code>title</code> adds a hover hint.
      {/snippet}
      <TagsExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        With <code>onClick</code>, the label is a native
        <code>&lt;button&gt;</code>; without it, the label is text.
      </li>
      <li>
        The remove button is named "Remove" plus the chip's label, like "Remove
        ada@example.com", and is at least 24 pixels square from the
        <code>sm</code> size up.
      </li>
      <li>
        Backspace or Delete on a focused chip calls <code>onDelete</code>.
      </li>
      <li>
        Chip's buttons have <code>type="button"</code>, so they never submit a
        form.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "onClick",
          type: "(event: MouseEvent | KeyboardEvent) => void",
          description: "Makes the label a button that calls this.",
        },
        {
          name: "onDelete",
          type: "(event: MouseEvent | KeyboardEvent) => void",
          description:
            "Adds a remove button, and Backspace or Delete on the focused chip, that call this.",
        },
        {
          name: "title",
          type: "string",
          description: "A hover hint for the label.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"filled"`,
          description: "How much attention the chip draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the chip uses.",
        },
        {
          name: "shape",
          type: `"square" | "rounded" | "circle"`,
          default: `"rounded"`,
          description: "Corner style.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "Text size and padding. The remove button grows with it, and is 24 pixels or larger from `sm` up.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The chip's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the chip. Your classes override the chip's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The label.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      chip's <code>&lt;div&gt;</code>. A native <code>onclick</code> there fires
      for the whole chip, including its remove button; use
      <code>onClick</code> for the chip's own action.
    </p>
  </Section>
</div>
