<script lang="ts">
  import { Button, Tooltip, type PopoverPlacement } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";

  const PLACEMENTS = ["top", "right", "bottom", "left"] as const;

  let placement: PopoverPlacement = $state("top");
  let rich = $state(false);
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex min-h-40 items-center justify-center">
          <Tooltip {placement} {rich}>
            {#snippet trigger(props)}
              <Button {...props} variant="tonal">Archive</Button>
            {/snippet}
            Moves the project out of your list. You can restore it later.
          </Tooltip>
        </div>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={placement}
          options={[...PLACEMENTS]}
          label="Placement"
        />
        <SwitchSetting label="Rich" bind:value={rich} />
      {/snippet}
      {#snippet code()}
        <Code
          component="Tooltip"
          defaults={{ placement: "top", rich: false }}
          values={{ placement, rich }}
          children={`{#snippet trigger(props)}
        <Button {...props}>Archive</Button>
      {/snippet}
      Moves the project out of your list. You can restore it later.`}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
