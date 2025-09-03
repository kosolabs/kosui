<script lang="ts">
  import { Button, COLORS, SHAPES, toTitleCase, VARIANTS } from "$lib/index.js";
  import { Link2 } from "@lucide/svelte";

  let clicked = $state(false);
</script>

{#if clicked}
  <div data-testid="result">Clicked!</div>
{/if}

<div class="flex flex-col gap-4">
  {#each SHAPES as shape (shape)}
    {#each VARIANTS as variant (variant)}
      {#each COLORS as color (color)}
        {@const title =
          toTitleCase(variant) +
          " " +
          toTitleCase(color) +
          " " +
          toTitleCase(shape)}
        <div>
          <div class="flex flex-wrap items-start gap-2">
            <Button {variant} {color} {shape} onclick={() => (clicked = true)}>
              {title} Button
            </Button>
            <Button
              {variant}
              {color}
              {shape}
              icon={Link2}
              onclick={() => (clicked = true)}
            />
            <Button
              {variant}
              {color}
              {shape}
              icon={Link2}
              onclick={() => (clicked = true)}
            >
              {title} Icon
            </Button>
            <Button
              disabled
              {variant}
              {color}
              {shape}
              onclick={() => (clicked = true)}
            >
              {title} Disabled
            </Button>
          </div>
        </div>
      {/each}
    {/each}
  {/each}
</div>
