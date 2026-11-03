<script lang="ts">
  import { Link } from "#lib/index.js";
  import { ExternalLink } from "@lucide/svelte";
</script>

<Link
  href="https://svelte.dev"
  target="_blank"
  rel="noreferrer"
  class="inline-flex items-center gap-1"
>
  Svelte
  <ExternalLink size={14} />
  <span class="sr-only">(opens in a new tab)</span>
</Link>
