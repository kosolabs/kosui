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
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";
  import { Bell, Inbox } from "@lucide/svelte";

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
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
  {/snippet}
</DocPage>
