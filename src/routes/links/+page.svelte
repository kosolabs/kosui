<script lang="ts">
  import { COLORS, UNDERLINES } from "$lib/base";
  import { Link } from "$lib/link";
  import { toTitleCase } from "$lib/utils";
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
