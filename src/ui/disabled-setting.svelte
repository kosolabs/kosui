<script lang="ts">
  import { Switch } from "$lib/index.js";
  import { Setting } from "$ui/index.js";

  export type DisabledSettingProps = {
    disabled: boolean;
  };
  let { disabled = $bindable() }: DisabledSettingProps = $props();
</script>

<Setting label="Disabled">
  <Switch id="Disabled" aria-label="disabled" bind:checked={disabled} />
</Setting>
