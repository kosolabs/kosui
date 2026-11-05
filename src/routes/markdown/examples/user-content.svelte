<script lang="ts">
  import { Markdown } from "#lib/index.js";

  const comment = `Thanks! I tried <img src=x onerror="alert('hi')"> and [this link](javascript:alert('hi')).

Here's **bold** text and a [safe link](https://svelte.dev).`;
</script>

<Markdown value={comment} class="max-w-prose" />
