<script lang="ts">
  import {
    Link,
    NavItem,
    SHAPES,
    SIZES,
    type Shape,
    type Size,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Archive, Inbox, Send, Star } from "@lucide/svelte";
  import CountsExample from "./examples/counts.svelte";
  import countsSource from "./examples/counts.svelte?raw";
  import GroupsExample from "./examples/groups.svelte";
  import groupsSource from "./examples/groups.svelte?raw";

  const FOLDERS = [
    { name: "Inbox", icon: Inbox },
    { name: "Starred", icon: Star },
    { name: "Sent", icon: Send },
    { name: "Archive", icon: Archive },
  ];

  let size: Size = $state("md");
  let shape: Shape = $state("full");
  let icons = $state(true);
  let current = $state("Inbox");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Nav items are the links in a navigation list, like a sidebar or a <Link
      href={resolve("drawer")}>Drawer</Link
    >. The current page gets a filled indicator. <code>NavGroup</code> labels a group
    of them.
  </p>

  <Playground>
    {#snippet component()}
      <nav aria-label="Mail" class="flex w-64 flex-col gap-0.5">
        {#each FOLDERS as folder (folder.name)}
          <NavItem
            href="#{folder.name.toLowerCase()}"
            icon={icons ? folder.icon : undefined}
            current={current === folder.name}
            {size}
            {shape}
            onclick={(event) => {
              event.preventDefault();
              current = folder.name;
            }}
          >
            {folder.name}
          </NavItem>
        {/each}
      </nav>
    {/snippet}
    {#snippet controls()}
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
      <SwitchSetting bind:value={icons} label="Icons" />
    {/snippet}
    {#snippet code()}
      <Code
        component="NavItem"
        defaults={{ href: "", current: false, size: "md", shape: "full" }}
        values={{ href: "/inbox", current: true, size, shape }}
        expressions={{ icon: icons ? "Inbox" : undefined }}
        imports={icons ? [`import { Inbox } from "@lucide/svelte";`] : []}
        children="Inbox"
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Groups" source={groupsSource}>
      {#snippet description()}
        <code>NavGroup</code> puts a label above related items and names the group
        for screen readers.
      {/snippet}
      <GroupsExample />
    </Example>

    <Example title="Counts" source={countsSource}>
      {#snippet description()}
        Children can hold more than a label. Push a count to the end with
        <code>ml-auto</code>, and add visually hidden text so it reads as more
        than a number.
      {/snippet}
      <CountsExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Put nav items in a <code>&lt;nav&gt;</code> with an
        <code>aria-label</code>, so screen readers list it as a navigation
        landmark.
      </li>
      <li>
        The current item gets <code>aria-current="page"</code>, which screen
        readers announce, as well as the filled indicator.
      </li>
      <li>
        A <code>NavGroup</code> is a <code>group</code> named by its label. Icons
        are decorative.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl">NavItem</h3>
    <PropsTable
      rows={[
        { name: "href", type: "string", description: "Where the item links." },
        {
          name: "current",
          type: "boolean",
          default: "false",
          description:
            "Whether the item is the current page. In SvelteKit, compare href with page.url.pathname.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon before the label.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"md"`,
          description: "The item's height, from the shared size scale.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "The corner radius of the indicator.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The `<a>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The label, and anything after it.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Other attributes pass through to the <code>&lt;a&gt;</code>.
    </p>

    <h3 class="mt-6 text-xl">NavGroup</h3>
    <PropsTable
      rows={[
        { name: "label", type: "string", description: "The group's label." },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The group's `<div>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The group's nav items.",
        },
      ]}
    />
  </Section>
</div>
