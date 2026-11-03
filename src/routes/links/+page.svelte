<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    COLORS,
    Link,
    UNDERLINES,
    type Color,
    type Underline,
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
      use: "Links marked by another cue, like an icon or a card around them.",
    },
  ];

  let color: Color = $state("primary");
  let underline: Underline = $state("always");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Links take people to another page, or to another place on the same page. To
    take an action, like saving or deleting, use a
    <Link href={resolve("button")}>Button</Link> instead.
  </p>

  <Playground>
    {#snippet component()}
      <p class="max-w-prose">
        Kosui components are written in Svelte. Read the
        <Link href={HREF} {color} {underline}>Svelte docs</Link>
        to learn more.
      </p>
    {/snippet}
    {#snippet controls()}
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
    {/snippet}
    {#snippet code()}
      <Code
        component="Link"
        defaults={{ href: "", color: "primary", underline: "always" }}
        values={{ href: HREF, color, underline }}
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

  <Section title="Links that look like buttons">
    <p class="max-w-prose">
      For navigation that should look like a button, like a call to action, give
      a <Link href={resolve("button")}>Button</Link> an <code>href</code>. It
      renders a link with all of Button's variants.
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
          default: `"always"`,
          description:
            "When the link is underlined. Keep `always` for links in text.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the link uses.",
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
