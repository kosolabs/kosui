<script lang="ts">
  import { Slider } from "#lib/index.js";
  import { Volume1, Volume2, VolumeX } from "@lucide/svelte";

  let volume = $state(40);
  let saved = $state(40);
</script>

<div class="flex w-full max-w-sm flex-col gap-2 pt-8">
  <div class="flex items-center gap-3">
    {#if volume === 0}
      <VolumeX size={20} aria-hidden="true" />
    {:else if volume < 50}
      <Volume1 size={20} aria-hidden="true" />
    {:else}
      <Volume2 size={20} aria-hidden="true" />
    {/if}
    <Slider
      bind:value={volume}
      format={(v) => `${v}%`}
      aria-label="Volume"
      onchange={() => (saved = volume)}
    />
  </div>
  <p class="text-sm">Saved volume: {saved}%</p>
</div>
