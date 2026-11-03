<script lang="ts">
  import { Button } from "#lib/index.js";
  import { Bold, Italic, Underline } from "@lucide/svelte";
</script>

<div role="group" aria-label="Text style" class="flex gap-1">
  <Button variant="plain" shape="circle" icon={Bold} tooltip="Bold" />
  <Button variant="plain" shape="circle" icon={Italic} tooltip="Italic" />
  <Button variant="plain" shape="circle" icon={Underline} tooltip="Underline" />
</div>
