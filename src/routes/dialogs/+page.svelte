<script lang="ts">
  import { Button, Dialog, SHAPES, type Shape } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Trash2 } from "@lucide/svelte";

  let open = $state(false);
  let icon = $state(false);
  let shape: Shape = $state("xl");
  let result = $state("");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <Button variant="tonal" color="error" onclick={() => (open = true)}>
            Discard draft
          </Button>
          <p class="text-sm" aria-live="polite">{result}</p>
          <Dialog
            bind:open
            icon={icon ? Trash2 : undefined}
            {shape}
            title="Discard draft?"
            onSelect={(discard) =>
              (result = discard ? "Discarded" : "Kept the draft")}
          >
            Your unsent message will be deleted.
            {#snippet actions(select)}
              <Button variant="plain" onclick={() => select(false)}>
                Cancel
              </Button>
              <Button variant="filled" onclick={() => select(true)}>
                Discard
              </Button>
            {/snippet}
          </Dialog>
        </div>
      {/snippet}
      {#snippet controls()}
        <SwitchSetting label="Icon" bind:value={icon} />
        <ToggleButtonSetting
          bind:value={shape}
          options={[...SHAPES]}
          label="Shape"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Dialog"
          components={["Button"]}
          imports={icon ? [`import { Trash2 } from "@lucide/svelte";`] : []}
          bindables={["open"]}
          defaults={{ open: false, title: "", shape: "xl" }}
          values={{ title: "Discard draft?", shape }}
          expressions={{
            icon: icon ? "Trash2" : undefined,
            onSelect: "(discard) => …",
          }}
          children={`Your unsent message will be deleted.
      {#snippet actions(select)}
        <Button variant="plain" onclick={() => select(false)}>Cancel</Button>
        <Button variant="filled" onclick={() => select(true)}>Discard</Button>
      {/snippet}`}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
