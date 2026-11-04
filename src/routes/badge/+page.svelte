<script lang="ts">
  import {
    Avatar,
    Badge,
    Button,
    COLORS,
    VARIANTS,
    type Color,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import { Bell, Inbox } from "@lucide/svelte";
  import AvatarStatusExample from "./examples/avatar-status.svelte";
  import avatarStatusSource from "./examples/avatar-status.svelte?raw";
  import UnreadCountExample from "./examples/unread-count.svelte";
  import unreadCountSource from "./examples/unread-count.svelte?raw";

  const CONTENTS = ["3", "42", "999+"];
  const ELEMENTS = ["icon button", "button", "avatar"];

  let variant: Variant = $state("filled");
  let color: Color = $state("error");
  let content = $state("3");
  let verticalAlignment: "top" | "bottom" = $state("top");
  let horizontalAlignment: "left" | "right" = $state("right");
  let element = $state("icon button");

  let elementCode = $derived(
    {
      "icon button": `<Button\n    variant="plain"\n    icon={Bell}\n    aria-label="Notifications, ${content} new"\n  />`,
      button: `<Button\n    variant="tonal"\n    icon={Inbox}\n    aria-label="Inbox, ${content} unread"\n  >\n    Inbox\n  </Button>`,
      avatar: `<Avatar alt="Ada Lovelace, ${content} new">\n    AL\n  </Avatar>`,
    }[element]!,
  );
  let elementComponent = $derived(element === "avatar" ? "Avatar" : "Button");
  let elementImports = $derived(
    {
      "icon button": [`import { Bell } from "@lucide/svelte";`],
      button: [`import { Inbox } from "@lucide/svelte";`],
      avatar: [],
    }[element]!,
  );
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Badges show a count or status on the corner of another element, like unread
    messages on an inbox button.
  </p>

  <Playground>
    {#snippet component()}
      <Badge
        {content}
        {variant}
        {color}
        {verticalAlignment}
        {horizontalAlignment}
        aria-hidden="true"
      >
        {#if element === "icon button"}
          <Button
            variant="plain"
            icon={Bell}
            aria-label="Notifications, {content} new"
          />
        {:else if element === "button"}
          <Button
            variant="tonal"
            icon={Inbox}
            aria-label="Inbox, {content} unread">Inbox</Button
          >
        {:else}
          <Avatar alt="Ada Lovelace, {content} new">AL</Avatar>
        {/if}
      </Badge>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={element}
        options={ELEMENTS}
        label="Element"
      />
      <ToggleButtonSetting
        bind:value={content}
        options={CONTENTS}
        label="Content"
      />
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
        bind:value={verticalAlignment}
        options={["top", "bottom"]}
        label="Vertical alignment"
      />
      <ToggleButtonSetting
        bind:value={horizontalAlignment}
        options={["left", "right"]}
        label="Horizontal alignment"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Badge"
        defaults={{
          content: "",
          variant: "filled",
          color: "error",
          verticalAlignment: "top",
          horizontalAlignment: "right",
          "aria-hidden": "",
        }}
        values={{
          content,
          variant,
          color,
          verticalAlignment,
          horizontalAlignment,
          "aria-hidden": "true",
        }}
        components={[elementComponent]}
        imports={elementImports}
        children={elementCode}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Unread count" source={unreadCountSource}>
      {#snippet description()}
        Put the count in the button's name, so screen readers announce it with
        the button, and hide the badge itself with <code>aria-hidden</code>. An
        empty <code>content</code> hides the badge.
      {/snippet}
      <UnreadCountExample />
    </Example>

    <Example title="Status on an avatar" source={avatarStatusSource}>
      {#snippet description()}
        Pass a <code>content</code> snippet to show an icon instead of text.
      {/snippet}
      <AvatarStatusExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        A badge is separate text after its element, so a screen reader reads it
        apart from the element it labels. Put what the badge says in the
        element's name, like <code>aria-label="Inbox, 3 unread"</code>, and give
        the badge <code>aria-hidden="true"</code>.
      </li>
      <li>
        Don't rely on the badge's color alone to carry meaning; say it in the
        element's name too.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "content",
          type: "string | Snippet",
          description:
            "What the badge shows. When empty, the badge isn't rendered.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"filled"`,
          description: "How much attention the badge draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"error"`,
          description: "The theme color the badge uses.",
        },
        {
          name: "verticalAlignment",
          type: `"top" | "bottom"`,
          default: `"top"`,
          description: "Which edge of the element the badge sits on.",
        },
        {
          name: "horizontalAlignment",
          type: `"left" | "right"`,
          default: `"right"`,
          description: "Which side of the element the badge sits on.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The badge's `<span>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the badge. Your classes override the badge's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The element the badge sits on.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      badge's <code>&lt;span&gt;</code>.
    </p>
  </Section>
</div>
