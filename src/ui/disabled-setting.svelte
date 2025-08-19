<script lang="ts">
  import SwitchSetting from "./switch-setting.svelte";

  export type DisabledSettingProps = {
    disabled: boolean;
  };
  let { disabled = $bindable() }: DisabledSettingProps = $props();
</script>

<SwitchSetting label="Disabled" bind:value={disabled} />
