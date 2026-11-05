<script lang="ts">
  import {
    Button,
    Menu,
    MenuDivider,
    MenuItem,
    SHAPES,
    type PopoverPlacement,
    type Shape,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  const PLACEMENTS = [
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
  ] as const;

  let placement: PopoverPlacement = $state("bottom-start");
  let shape: Shape = $state("xs");
  let last = $state("");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex min-h-48 flex-col items-center justify-center gap-3">
          <Menu {placement} {shape}>
            {#snippet trigger(props)}
              <Button {...props} variant="tonal">Options</Button>
            {/snippet}
            <MenuItem onSelect={() => (last = "Renamed")}>Rename</MenuItem>
            <MenuItem onSelect={() => (last = "Duplicated")}>Duplicate</MenuItem
            >
            <MenuDivider />
            <MenuItem color="error" onSelect={() => (last = "Deleted")}>
              Delete
            </MenuItem>
          </Menu>
          <p class="text-sm" aria-live="polite">{last}</p>
        </div>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={placement}
          options={[...PLACEMENTS]}
          label="Placement"
        />
        <ToggleButtonSetting
          bind:value={shape}
          options={[...SHAPES]}
          label="Shape"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Menu"
          components={["MenuItem", "MenuDivider", "Button"]}
          defaults={{ placement: "bottom-start", shape: "xs" }}
          values={{ placement, shape }}
          children={`{#snippet trigger(props)}
        <Button {...props}>Options</Button>
      {/snippet}
      <MenuItem onSelect={rename}>Rename</MenuItem>
      <MenuItem onSelect={duplicate}>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem color="error" onSelect={remove}>Delete</MenuItem>`}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
