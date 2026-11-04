<script lang="ts">
  import { Badge, Button } from "#lib/index.js";
  import { Inbox } from "@lucide/svelte";

  let unread = $state(3);
</script>

<div class="flex items-center gap-4">
  <Badge content={unread ? String(unread) : ""} aria-hidden="true">
    <Button
      variant="plain"
      shape="circle"
      icon={Inbox}
      aria-label={unread ? `Inbox, ${unread} unread` : "Inbox"}
      onclick={() => (unread = 0)}
    />
  </Badge>
  <Button variant="text" onclick={() => unread++}>Receive a message</Button>
</div>
