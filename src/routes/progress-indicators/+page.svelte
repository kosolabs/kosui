<script lang="ts">
  import {
    CircularProgress,
    COLORS,
    SIZES,
    type Color,
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
  import UploadExample from "./examples/upload.svelte";
  import uploadSource from "./examples/upload.svelte?raw";
  import WithMessageExample from "./examples/with-message.svelte";
  import withMessageSource from "./examples/with-message.svelte?raw";

  const PROGRESSES = ["spinner", "0%", "25%", "60%", "100%"];

  let shown = $state("60%");
  let size: Size = $state("lg");
  let color: Color = $state("primary");
  let label = $state(true);

  let progress = $derived(
    shown === "spinner" ? undefined : parseInt(shown) / 100,
  );
  let text = $derived(label && progress !== undefined ? shown : undefined);
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Circular progress shows that something is loading: how far along it is when
    you know, or a spinner when you don't.
  </p>

  <Playground>
    {#snippet component()}
      <CircularProgress {progress} {size} {color}>{text}</CircularProgress>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={shown}
        options={PROGRESSES}
        label="Progress"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <SwitchSetting label="Percentage" bind:value={label} />
    {/snippet}
    {#snippet code()}
      <Code
        component="CircularProgress"
        defaults={{ size: "sm", color: "primary" }}
        values={{ size, color }}
        expressions={{ progress: progress?.toString() }}
        children={text}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Upload" source={uploadSource}>
      {#snippet description()}
        Name the ring after what's loading, and show the percentage inside it.
      {/snippet}
      <UploadExample />
    </Example>

    <Example title="Next to a message" source={withMessageSource}>
      {#snippet description()}
        When text already says what's happening, hide the spinner from screen
        readers and put the text in a <code>role="status"</code> region.
      {/snippet}
      <WithMessageExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        The ring is a progress bar named "Loading". Pass
        <code>aria-label</code> to say what's loading.
      </li>
      <li>
        With <code>progress</code>, screen readers announce its value as a
        percentage. A spinner has no value.
      </li>
      <li>
        When nearby text says what's loading, pass
        <code>aria-hidden="true"</code> so it isn't announced twice. Inside a button,
        this keeps the spinner out of the button's name.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "progress",
          type: "number",
          description:
            "How far along it is, from 0 to 1. Leave it out for a spinner.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "16, 24, 32, 40 or 48 pixels, to fit inside a row of the same size. For a larger ring, use a size class, like `size-24`.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The theme color of the ring, its track and its text. Use inherit inside buttons.",
        },
        {
          name: "aria-label",
          type: "string",
          default: `"Loading"`,
          description: "What's loading, for screen readers.",
        },
        {
          name: "el",
          type: "SVGSVGElement",
          description: "Bindable. The ring's `<svg>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the ring. Your classes override its own.",
        },
        {
          name: "children",
          type: "Snippet",
          description:
            "Text in the middle, like a percentage. Screen readers announce the value instead.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      ring's <code>&lt;svg&gt;</code>.
    </p>
  </Section>
</div>
