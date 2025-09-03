<script lang="ts">
  import { Switch } from "$lib/index.js";

  export type SwitchSettingProps = {
    label: string;
    value: boolean;
  };
  let { label, value = $bindable() }: SwitchSettingProps = $props();
  let id = $derived(label.toLocaleLowerCase().replaceAll(" ", "-"));
</script>

<div class="labeled">
  <Switch {id} bind:checked={value} />
  <label class="text-sm" for={id}>{label}</label>
</div>

<style>
  .labeled {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }
</style>
