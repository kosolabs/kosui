<script lang="ts">
  import { NavItem, SHAPES, SIZES, type Shape, type Size } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Archive, Inbox, Send, Star } from "@lucide/svelte";

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
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
  {/snippet}
</DocPage>
