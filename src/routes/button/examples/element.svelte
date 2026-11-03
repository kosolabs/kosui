<script lang="ts">
  import { Button } from "#lib/index.js";

  let width = $state(0);

  function measure(node: HTMLElement) {
    const observer = new ResizeObserver(() => (width = node.offsetWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }
</script>

<Button {@attach measure}>Measure me</Button>
<p class="w-full text-center text-sm">This button is {width}px wide.</p>
