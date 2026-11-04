<script lang="ts">
  import { Switch } from "#lib/index.js";

  const SETTINGS = [
    {
      key: "notifications",
      label: "Notifications",
      hint: "Get told when someone assigns you a task.",
    },
    {
      key: "digest",
      label: "Weekly digest",
      hint: "A summary of your projects every Monday.",
    },
    {
      key: "sounds",
      label: "Sounds",
      hint: "Play a sound when a task is done.",
    },
  ];

  const id = $props.id();
  let enabled: Record<string, boolean> = $state({
    notifications: true,
    digest: false,
    sounds: false,
  });
</script>

<ul class="flex max-w-md flex-col divide-y divide-m3-outline-variant">
  {#each SETTINGS as setting (setting.key)}
    <li class="flex items-center gap-4 py-3">
      <div class="flex-1">
        <label for="{id}-{setting.key}" class="text-sm font-medium">
          {setting.label}
        </label>
        <p
          id="{id}-{setting.key}-hint"
          class="text-xs text-m3-on-surface-variant"
        >
          {setting.hint}
        </p>
      </div>
      <Switch
        id="{id}-{setting.key}"
        aria-describedby="{id}-{setting.key}-hint"
        bind:checked={enabled[setting.key]}
      />
    </li>
  {/each}
</ul>
