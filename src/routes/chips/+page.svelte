<script lang="ts">
  import { Chip, COLORS, SHAPES, VARIANTS } from "$lib/index.js";
</script>

<div class="flex flex-wrap gap-4">
  {#each SHAPES as shape (shape)}
    {#each VARIANTS as variant (variant)}
      {#each COLORS as color (color)}
        <div>
          <Chip
            {variant}
            {color}
            {shape}
            onClick={() => console.log("click!")}
            onDelete={() => console.log("delete!")}
          >
            Chip
          </Chip>
        </div>
      {/each}
    {/each}
  {/each}
</div>
