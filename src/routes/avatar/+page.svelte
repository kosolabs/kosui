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
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";
  import { UserRound } from "@lucide/svelte";

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
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
  {/snippet}
</DocPage>
