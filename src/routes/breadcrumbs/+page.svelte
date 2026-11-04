<script lang="ts">
  import { Breadcrumbs, COLORS, type Color } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import FoldersExample from "./examples/folders.svelte";
  import foldersSource from "./examples/folders.svelte?raw";

  const PATH = [
    { title: "Home", href: "#home" },
    { title: "Projects", href: "#projects" },
    { title: "Kosui", href: "#kosui" },
    { title: "Docs", href: "#docs" },
  ];
  const SEPARATORS = ["›", "/", "·"];

  let depth = $state("3");
  let separator = $state("›");
  let color: Color = $state("primary");

  let path = $derived(PATH.slice(0, Number(depth)));
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Breadcrumbs show where a page sits in a hierarchy, with a link to each level
    above it.
  </p>

  <Playground>
    {#snippet component()}
      <Breadcrumbs {path} {separator} {color} />
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={depth}
        options={["2", "3", "4"]}
        label="Depth"
      />
      <ToggleButtonSetting
        bind:value={separator}
        options={SEPARATORS}
        label="Separator"
      />
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Breadcrumbs"
        defaults={{ separator: "›", color: "primary" }}
        values={{ separator, color }}
        expressions={{
          path: `[\n${path.map((c) => `    { title: "${c.title}", href: "${c.href}" },`).join("\n")}\n  ]`,
        }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Folders" source={foldersSource}>
      {#snippet description()}
        A <code>separator</code> snippet can hold an icon. Long trails wrap between
        levels, and levels can share a name.
      {/snippet}
      <FoldersExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Breadcrumbs are a navigation landmark named "Breadcrumb", so screen
        reader users can jump to them. Pass <code>aria-label</code> to rename it.
      </li>
      <li>
        Levels are an ordered list, so screen readers announce how many there
        are. Separators are hidden from them.
      </li>
      <li>
        The last crumb is the current page: it's marked
        <code>aria-current="page"</code> and shown in the surrounding text color.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "path",
          type: "{ title: string; href: string }[]",
          description:
            "The levels, from the top of the hierarchy to the current page.",
        },
        {
          name: "separator",
          type: "string | Snippet",
          default: `"›"`,
          description: "Shown between levels, and hidden from screen readers.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The links' theme color. The current page uses the surrounding text color.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The breadcrumbs' `<nav>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the `<nav>`.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;nav&gt;</code>.
    </p>
  </Section>
</div>
