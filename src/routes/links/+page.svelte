<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    COLORS,
    Link,
    SHAPES,
    UNDERLINES,
    VARIANTS,
    type Color,
    type Shape,
    type Underline,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    GuidanceTable,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
    type GuidanceRow,
  } from "#ui";
  import CallToActionExample from "./examples/call-to-action.svelte";
  import callToActionSource from "./examples/call-to-action.svelte?raw";
  import ExternalExample from "./examples/external.svelte";
  import externalSource from "./examples/external.svelte?raw";
  import InTextExample from "./examples/in-text.svelte";
  import inTextSource from "./examples/in-text.svelte?raw";
  import NavigationExample from "./examples/navigation.svelte";
  import navigationSource from "./examples/navigation.svelte?raw";

  const HREF = "https://svelte.dev/docs/svelte";

  const UNDERLINE_GUIDANCE: GuidanceRow<Underline>[] = [
    {
      name: "always",
      use: "Links in running text, where the underline is what marks them. The default for text links.",
    },
    {
      name: "hover",
      use: "Navigation, menus and breadcrumbs, where a link's position already marks it.",
    },
    {
      name: "none",
      use: "Links styled as buttons, or links marked by another cue, like an icon. The default for button-like variants.",
    },
  ];

  let variant: Variant = $state("text");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
  let underline: Underline = $state("always");

  let defaultUnderline = $derived(variant === "text" ? "always" : "none");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Links take people to another page, or to another place on the same page. To
    take an action, like saving or deleting, use a
    <Link href={resolve("button")}>Button</Link> instead.
  </p>

  <Playground>
    {#snippet component()}
      {#if variant === "text"}
        <p class="max-w-prose">
          Kosui components are written in Svelte. Read the
          <Link href={HREF} {variant} {color} {shape} {underline}>
            Svelte docs
          </Link>
          to learn more.
        </p>
      {:else}
        <Link href={HREF} {variant} {color} {shape} {underline}>
          Svelte docs
        </Link>
      {/if}
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
        bind:value={underline}
        options={[...UNDERLINES]}
        label="Underline"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Link"
        defaults={{
          href: "",
          variant: "text",
          color: "primary",
          underline: defaultUnderline,
          shape: "rounded",
        }}
        values={{ href: HREF, variant, color, underline, shape }}
        children="Svelte docs"
      />
    {/snippet}
  </Playground>

  <Section title="Choosing an underline">
    <p class="max-w-prose">
      People recognize links by their underline. Keep it wherever links sit in
      text, and drop it only where something else makes a link obvious.
    </p>
    <GuidanceTable heading="Underline" rows={UNDERLINE_GUIDANCE}>
      {#snippet example(underline)}
        <Link href={HREF} {underline}>Svelte docs</Link>
      {/snippet}
    </GuidanceTable>
  </Section>

  <Section title="Choosing a variant">
    <p class="max-w-prose">
      Most links use the default <code>text</code> variant. The other variants
      make a link look like a button, for navigation that should stand out, like
      a call to action. They follow the same emphasis guidance as
      <Link href={resolve("button")}>Button variants</Link>: what matters is
      whether it navigates (a Link) or acts (a Button), not how it looks.
    </p>
  </Section>

  <Section title="Examples">
    <Example title="Links in text" source={inTextSource}>
      {#snippet description()}
        The default underline marks links without relying on color alone.
      {/snippet}
      <InTextExample />
    </Example>

    <Example title="Navigation" source={navigationSource}>
      {#snippet description()}
        In navigation, position marks the links, so underline on hover. Mark the
        current page with <code>aria-current="page"</code>, and pass SvelteKit
        paths through <code>resolve()</code>.
      {/snippet}
      <NavigationExample />
    </Example>

    <Example title="Call to action" source={callToActionSource}>
      {#snippet description()}
        A link that should look like a button keeps link semantics: it still
        navigates, and appears in a screen reader's list of links.
      {/snippet}
      <CallToActionExample />
    </Example>

    <Example title="Opening a new tab" source={externalSource}>
      {#snippet description()}
        Say when a link opens a new tab, with an icon for sighted people and
        hidden text for screen readers.
      {/snippet}
      <ExternalExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Link renders a native <code>&lt;a&gt;</code>, so Enter follows it and it
        appears in a screen reader's list of links.
      </li>
      <li>
        Text links are underlined by default, so they don't depend on color
        alone to stand out from the text around them.
      </li>
      <li>
        A focus ring appears for keyboard focus only, not after a mouse click.
      </li>
      <li>
        Write link text that names the destination, like "Svelte docs", rather
        than "click here".
      </li>
      <li>
        Say when a link opens a new tab, and mark the current page in navigation
        with <code>aria-current="page"</code>.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "href",
          type: "string",
          description: "Required. Where the link goes.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The link text.",
        },
        {
          name: "underline",
          type: `"always" | "hover" | "none"`,
          default: `"always"` + " or " + `"none"`,
          description:
            "Defaults to `always` for the `text` variant and `none` for the others.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"text"`,
          description:
            "`text` for links; the others make a link look like a button.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the link uses.",
        },
        {
          name: "shape",
          type: `"square" | "rounded" | "circle"`,
          default: `"rounded"`,
          description:
            "Corner style, for button-like variants and the focus ring.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The rendered `<a>` element.",
        },
        {
          name: "ref",
          type: "(el: HTMLElement) => void",
          description:
            "Called with the element when it mounts. `{@attach}` does the same and composes better.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Strings, arrays or objects, like Svelte's `class` attribute. Your classes override the link's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other <code>&lt;a&gt;</code> attribute, like <code>target</code>,
      <code>rel</code> or <code>download</code>, and every event handler and
      attachment passes through to the element.
    </p>
  </Section>
</div>
