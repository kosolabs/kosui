<script lang="ts">
  import { Button, getDialogs } from "#lib/index.js";
  import { Trash2 } from "@lucide/svelte";

  const dialogs = getDialogs();
  let project = $state("Quarterly plan");
  let status = $state("");

  async function remove() {
    const confirmed = await dialogs.confirm({
      icon: Trash2,
      title: "Delete project?",
      message: `${project} and its tasks will be deleted for everyone.`,
      acceptText: "Delete",
    });
    status = confirmed ? `Deleted ${project}` : "Kept";
  }

  async function rename() {
    const name = await dialogs.prompt({
      title: "Rename project",
      message: "Name",
      input: { value: project, required: true },
      acceptText: "Rename",
    });
    if (name) project = name;
  }

  async function share() {
    await dialogs.alert({
      title: "Link copied",
      message: "Anyone with the link can view this project.",
    });
    status = "Shared";
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex flex-wrap gap-2">
    <Button variant="tonal" onclick={rename}>Rename</Button>
    <Button variant="tonal" onclick={share}>Share</Button>
    <Button variant="tonal" color="error" onclick={remove}>Delete</Button>
  </div>
  <p class="text-sm" aria-live="polite">
    Project: {project}{status && ` · ${status}`}
  </p>
</div>
