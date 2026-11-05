<script lang="ts">
  import {
    Button,
    Drawer,
    NavGroup,
    NavItem,
    SHAPES,
    type DrawerSide,
    type Shape,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";
  import { Archive, Inbox, Menu, Send, Star } from "@lucide/svelte";

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
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
          defaults={{
            open: false,
            side: "start",
            shape: "lg",
            "aria-label": "",
          }}
          values={{ side, shape, "aria-label": "Mail" }}
          children={DRAWER_CHILDREN}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
