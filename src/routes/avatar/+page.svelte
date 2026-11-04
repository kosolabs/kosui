<script lang="ts">
  import {
    Avatar,
    COLORS,
    SHAPES,
    VARIANTS,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import { asset } from "$app/paths";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import { UserRound } from "@lucide/svelte";
  import WithNameExample from "./examples/with-name.svelte";
  import withNameSource from "./examples/with-name.svelte?raw";

  const CONTENTS = ["image", "initials", "icon", "broken image"];
  const SIZES: Record<string, string | undefined> = {
    small: "size-6",
    medium: undefined,
    large: "size-16",
  };

  let content = $state("image");
  let size = $state("medium");
  let variant: Variant = $state("tonal");
  let color: Color = $state("secondary");
  let shape: Shape = $state("full");

  let src = $derived(
    {
      image: asset("avatar-example.svg"),
      initials: "",
      icon: "",
      "broken image": "/missing-avatar.png",
    }[content],
  );
  let srcCode = $derived(
    {
      image: "/ada.jpg",
      initials: "",
      icon: "",
      "broken image": "/missing-avatar.png",
    }[content],
  );
  let fallback = $derived(
    content === "icon" ? "<UserRound />" : content === "image" ? "" : "AL",
  );
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Avatars show a person's picture, with initials or an icon when there's no
    picture or it fails to load.
  </p>

  <Playground>
    {#snippet component()}
      <Avatar
        {src}
        alt="Ada Lovelace"
        {variant}
        {color}
        {shape}
        class={SIZES[size]}
      >
        {#if content === "icon"}
          <UserRound />
        {:else if content !== "image"}
          AL
        {/if}
      </Avatar>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={content}
        options={CONTENTS}
        label="Content"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={Object.keys(SIZES)}
        label="Size"
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
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Avatar"
        defaults={{
          src: "",
          alt: "",
          variant: "tonal",
          color: "secondary",
          shape: "full",
          class: "",
        }}
        values={{
          src: srcCode,
          alt: "Ada Lovelace",
          variant,
          color,
          shape,
          class: SIZES[size] ?? "",
        }}
        imports={content === "icon"
          ? [`import { UserRound } from "@lucide/svelte";`]
          : []}
        children={fallback || undefined}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Next to a name" source={withNameSource}>
      {#snippet description()}
        When the person's name is right beside the avatar, leave out
        <code>alt</code> so screen readers don't read the name twice.
      {/snippet}
      <WithNameExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        With <code>alt</code>, the avatar is an image named by it, whether it
        shows the picture or the fallback.
      </li>
      <li>
        Without <code>alt</code>, the avatar is decorative: the picture is
        hidden from screen readers, and fallback text is read as text.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "src",
          type: "string",
          description:
            "The picture's URL. It's cropped to fill the avatar. When it's empty or fails to load, the avatar shows its children.",
        },
        {
          name: "alt",
          type: "string",
          description:
            "The person's name, announced for the picture and the fallback alike.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"tonal"`,
          description: "The fallback's background style.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"secondary"`,
          description: "The theme color the fallback uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The avatar's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the avatar. Set its size with a height or size class, like `size-16`; fallback text scales with it.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The fallback, like initials or an icon.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      avatar's <code>&lt;div&gt;</code>.
    </p>
  </Section>
</div>
