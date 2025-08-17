<script lang="ts">
  import { Alert, COLORS, SHAPES, VARIANTS } from "$lib/index.js";
</script>

<div class="flex flex-col gap-4">
  {#each SHAPES as shape (shape)}
    {#each VARIANTS as variant (variant)}
      {#each COLORS as color (color)}
        <div>
          <Alert {variant} {color} {shape}>
            This is an alert with (variant, color, shape): ({variant}, {color}, {shape})
          </Alert>
        </div>
      {/each}
    {/each}
  {/each}
</div>
