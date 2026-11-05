<script lang="ts">
  import { Button, Popover } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  const PLACEMENTS = ["top", "right", "bottom", "left"] as const;

  let placement: (typeof PLACEMENTS)[number] = $state("bottom");
  let open = $state(false);
  let anchorEl: HTMLElement | undefined = $state();
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex min-h-48 items-center justify-center">
          <Button
            bind:el={anchorEl}
            variant="tonal"
            aria-expanded={open}
            onclick={() => (open = !open)}
          >
            Details
          </Button>
          <Popover
            bind:open
            {anchorEl}
            {placement}
            role="dialog"
            aria-label="Details"
            class="max-w-56 rounded-md border bg-m3-surface-container p-3 text-sm shadow"
          >
            Due Friday. Three tasks left, one blocked on review.
          </Popover>
        </div>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={placement}
          options={[...PLACEMENTS]}
          label="Placement"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Popover"
          bindables={["open"]}
          defaults={{ placement: "top" }}
          values={{ placement }}
          expressions={{ anchorEl: "trigger" }}
          children="Due Friday. Three tasks left, one blocked on review."
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
