<script lang="ts">
  import { ToggleButton, ToggleGroup } from "#lib/index.js";
  import { AlignCenter, AlignLeft, AlignRight } from "@lucide/svelte";

  let alignment = $state("left");
</script>

<div class="flex flex-col items-start gap-3">
  <ToggleGroup
    bind:value={alignment}
    aria-label="Text alignment"
    color="plain"
    shape="sm"
  >
    <ToggleButton value="left" aria-label="Align left" title="Align left">
      <AlignLeft size={16} />
    </ToggleButton>
    <ToggleButton value="center" aria-label="Center" title="Center">
      <AlignCenter size={16} />
    </ToggleButton>
    <ToggleButton value="right" aria-label="Align right" title="Align right">
      <AlignRight size={16} />
    </ToggleButton>
  </ToggleGroup>
  <p class="w-64 text-sm" style:text-align={alignment}>
    Kosui's components speak one design language.
  </p>
</div>
