<script lang="ts">
  import { Avatar, COLORS, VARIANTS } from "$lib/index.js";
  import { UserRound } from "@lucide/svelte";
</script>

<div class="flex flex-wrap gap-4 rounded-lg border p-4">
  {#each VARIANTS as variant (variant)}
    {#each COLORS as color (color)}
      <Avatar
        {variant}
        {color}
        src="https://static.wikia.nocookie.net/dilbert/images/6/60/Boss.PNG"
      />
    {/each}
  {/each}
</div>

<div class="flex flex-wrap gap-4 rounded-lg border p-4">
  {#each VARIANTS as variant (variant)}
    {#each COLORS as color (color)}
      <Avatar {variant} {color} shape="circle">FB</Avatar>
    {/each}
  {/each}
</div>

<div class="flex flex-wrap gap-4 rounded-lg border p-4">
  {#each VARIANTS as variant (variant)}
    {#each COLORS as color (color)}
      <Avatar {variant} {color} shape="square"><UserRound /></Avatar>
    {/each}
  {/each}
</div>
