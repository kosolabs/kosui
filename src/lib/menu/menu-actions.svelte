<script lang="ts">
  import type { Action } from "#lib/command/index.js";
  import { Divider as MenuDivider } from "#lib/common/index.js";
  import { ShortcutHint } from "#lib/shortcut/index.js";
  import MenuGroup from "./menu-group.svelte";
  import MenuItem from "./menu-item.svelte";

  export type MenuActionsProps = {
    actions: Action[];
  };
  let { actions }: MenuActionsProps = $props();

  type Group = { category: string; actions: Action[]; checkable: boolean };

  const groups = $derived(
    actions.reduce<Group[]>((groups, action) => {
      let last = groups.at(-1);
      if (last?.category !== action.category) {
        last = { category: action.category, actions: [], checkable: false };
        groups.push(last);
      }
      last.actions.push(action);
      last.checkable ||= action.selected !== undefined;
      return groups;
    }, []),
  );
</script>

{#snippet items({ actions, checkable }: Group)}
  {#each actions as action (action)}
    <MenuItem
      onSelect={action.callback}
      title={action.description}
      disabled={!action.enabled()}
      checked={checkable ? (action.selected?.() ?? false) : undefined}
    >
      <action.icon size={16} class="shrink-0" />
      {action.name}
      {#if action.shortcut}
        <ShortcutHint shortcut={action.shortcut} class="ml-auto pl-4" />
      {/if}
    </MenuItem>
  {/each}
{/snippet}

{#each groups as group, index (index)}
  {#if index > 0}
    <MenuDivider />
  {/if}
  {#if group.category}
    <MenuGroup label={group.category}>
      {@render items(group)}
    </MenuGroup>
  {:else}
    {@render items(group)}
  {/if}
{/each}
