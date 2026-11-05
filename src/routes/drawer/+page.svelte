<script lang="ts">
  import {
    Button,
    Drawer,
    Link,
    NavGroup,
    NavItem,
    SHAPES,
    type DrawerSide,
    type Shape,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import { Archive, Inbox, Menu, Send, Star } from "@lucide/svelte";
  import FiltersExample from "./examples/filters.svelte";
  import filtersSource from "./examples/filters.svelte?raw";

  const FOLDERS = [
    { name: "Inbox", icon: Inbox },
    { name: "Starred", icon: Star },
    { name: "Sent", icon: Send },
    { name: "Archive", icon: Archive },
  ];

  const DRAWER_CHILDREN = `<nav aria-label="Folders">…</nav>`;

  let open = $state(false);
  let side: DrawerSide = $state("start");
  let shape: Shape = $state("lg");
  let folder = $state("Inbox");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Drawers slide in from the edge of the screen, above the page, to hold
    navigation or a panel like filters. On wide screens, show the same
    navigation in a sidebar instead, as this site does.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <Button
          icon={Menu}
          variant="tonal"
          aria-haspopup="dialog"
          aria-expanded={open}
          onclick={() => (open = true)}
        >
          Open drawer
        </Button>
        <p class="text-sm" aria-live="polite">Showing {folder}</p>
      </div>
      <Drawer bind:open {side} {shape} aria-label="Mail">
        <nav aria-label="Folders">
          <NavGroup label="Mail">
            {#each FOLDERS as item (item.name)}
              <NavItem
                href="#{item.name.toLowerCase()}"
                icon={item.icon}
                current={folder === item.name}
                onclick={(event) => {
                  event.preventDefault();
                  folder = item.name;
                  open = false;
                }}
              >
                {item.name}
              </NavItem>
            {/each}
          </NavGroup>
        </nav>
      </Drawer>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={side}
        options={["start", "end"]}
        label="Side"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Drawer"
        bindables={["open"]}
        defaults={{ open: false, side: "start", shape: "lg", "aria-label": "" }}
        values={{ side, shape, "aria-label": "Mail" }}
        children={DRAWER_CHILDREN}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="A panel of filters" source={filtersSource}>
      {#snippet description()}
        Use <code>side="end"</code> for panels that act on the page, like
        filters or details, and name the drawer with
        <code>aria-labelledby</code> pointing at its heading. Set
        <code>open</code> to false to close it after an action.
      {/snippet}
      <FiltersExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Drawer is a <Link href={resolve("modal")}>Modal</Link>: a native
        <code>&lt;dialog&gt;</code> that makes the rest of the page inert and
        keeps focus inside. Name it with <code>aria-label</code> or
        <code>aria-labelledby</code>.
      </li>
      <li>
        Escape, a click on the backdrop and Android's back gesture close it, and
        focus returns to the button that opened it. Give that button
        <code>aria-haspopup="dialog"</code> and <code>aria-expanded</code>.
      </li>
      <li>
        <code>start</code> is the left edge in left-to-right languages and the right
        edge in right-to-left ones.
      </li>
      <li>Drawers don't slide when reduced motion is requested.</li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the drawer is showing. Escape and backdrop clicks set it to false.",
        },
        {
          name: "side",
          type: `"start" | "end"`,
          default: `"start"`,
          description: "The edge the drawer slides in from.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"lg"`,
          description: "The radius of the corners on the open edge.",
        },
        {
          name: "onCancel",
          type: "() => void",
          description:
            "Called when someone dismisses the drawer with Escape, the backdrop or the back gesture.",
        },
        {
          name: "el",
          type: "HTMLDialogElement",
          description: "Bindable. The `<dialog>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the drawer, such as its width or padding. It's 20rem wide by default and leaves a strip of the page showing on phones.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The drawer's content.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;dialog&gt;</code>.
    </p>
  </Section>
</div>
