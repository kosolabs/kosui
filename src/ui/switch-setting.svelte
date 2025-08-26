<script lang="ts">
  import { Switch } from "$lib/index.js";

  export type SwitchSettingProps = {
    label: string;
    value: boolean;
  };
  let { label, value = $bindable() }: SwitchSettingProps = $props();
  let id = $derived(label.toLocaleLowerCase().replaceAll(" ", "-"));
</script>

<div class="flex items-center gap-2">
  <Switch {id} bind:checked={value} />
  <label class="text-sm" for={id}>{label}</label>
</div>
