<script lang="ts">
  import { COLORS, Link, toTitleCase, UNDERLINES } from "$lib/index.js";
</script>

<div class="flex flex-col gap-4">
  {#each UNDERLINES as underline (underline)}
    {@const underlineTitle = toTitleCase(underline)}
    <div>
      <div class="mb-2">Underline {underlineTitle}</div>
      <ul>
        {#each COLORS as color (color)}
          <li>
            Here is a <Link {underline} {color} href="">{color}</Link>
            link.
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
