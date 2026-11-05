<script lang="ts">
  import { Button, Modal } from "#lib/index.js";
  import { DocPage, Playground } from "#ui";

  const id = $props.id();
  let open = $state(false);
  let closedBy = $state("No answer yet");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <Button variant="filled" onclick={() => (open = true)}>
            Show terms
          </Button>
          <p class="text-sm" aria-live="polite">{closedBy}</p>
          <Modal
            bind:open
            aria-labelledby="{id}-title"
            class="w-[min(calc(100%-1em),28em)]"
            onCancel={() => (closedBy = "Dismissed")}
          >
            <h2 id="{id}-title" class="mb-2 text-xl">Terms of service</h2>
            <p class="mb-4 text-sm">
              Press Escape or click outside to dismiss, or accept below.
            </p>
            <div class="flex justify-end">
              <Button
                variant="filled"
                onclick={() => {
                  open = false;
                  closedBy = "Accepted";
                }}
              >
                Accept
              </Button>
            </div>
          </Modal>
        </div>
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
