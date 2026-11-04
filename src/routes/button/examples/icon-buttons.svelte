<script lang="ts">
  import { Button } from "#lib/index.js";
  import { Bold, Italic, Underline } from "@lucide/svelte";
</script>

<div role="group" aria-label="Text style" class="flex gap-1">
  <Button variant="plain" icon={Bold} tooltip="Bold" />
  <Button variant="plain" icon={Italic} tooltip="Italic" />
  <Button variant="plain" icon={Underline} tooltip="Underline" />
</div>
