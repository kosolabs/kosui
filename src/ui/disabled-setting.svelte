<script lang="ts">
  import { Switch } from "$lib";
  import Setting from "./setting.svelte";

  type DisabledSettingProps = {
    disabled: boolean;
  };
  let { disabled = $bindable() }: DisabledSettingProps = $props();
</script>

<Setting label="Disabled">
  <Switch id="Disabled" bind:checked={disabled} />
</Setting>
