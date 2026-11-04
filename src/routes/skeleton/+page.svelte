<script lang="ts">
  import { SHAPES, Skeleton, type Shape } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import LoadingProfileExample from "./examples/loading-profile.svelte";
  import loadingProfileSource from "./examples/loading-profile.svelte?raw";
  import SizedByContentExample from "./examples/sized-by-content.svelte";
  import sizedByContentSource from "./examples/sized-by-content.svelte?raw";

  const STAND_INS: Record<string, string> = {
    "text line": "w-48",
    block: "h-20 w-48",
    avatar: "size-9",
  };

  let standIn = $state("text line");
  let shape: Shape = $state("xs");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Skeletons stand in for content while it loads, in roughly its shape, so the
    page doesn't jump when the content arrives.
  </p>

  <Playground>
    {#snippet component()}
      <Skeleton {shape} class={STAND_INS[standIn]} />
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={standIn}
        options={Object.keys(STAND_INS)}
        label="Stand-in for"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Skeleton"
        defaults={{ shape: "xs" }}
        values={{ shape, class: STAND_INS[standIn] }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Loading a profile" source={loadingProfileSource}>
      {#snippet description()}
        Mark the loading region with <code>aria-busy</code>, and swap the
        skeletons for the content when it arrives.
      {/snippet}
      <LoadingProfileExample />
    </Example>

    <Example title="Sized by content" source={sizedByContentSource}>
      {#snippet description()}
        Children set a skeleton's size without being shown or read, so a
        skeleton can match a button or a heading exactly.
      {/snippet}
      <SizedByContentExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Skeletons are hidden from screen readers. Children only set the size;
        they're invisible and aren't read.
      </li>
      <li>
        Set <code>aria-busy="true"</code> on the region that's loading, and
        <code>false</code> once the content is in, so screen readers wait for the
        real content.
      </li>
      <li>
        The pulse stops for people who ask for reduced motion in their system
        settings.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          description:
            "A container style in place of the default surface background.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          description: "The theme color a variant uses.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The skeleton's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the skeleton, like its width and height. Without a height, it's one line of text tall.",
        },
        {
          name: "children",
          type: "Snippet",
          description:
            "Content that sets the skeleton's size. It's invisible and isn't read.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      skeleton's <code>&lt;div&gt;</code>.
    </p>
  </Section>
</div>
