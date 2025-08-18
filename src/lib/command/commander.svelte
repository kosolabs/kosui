<script module lang="ts">
  import {
    Action,
    Command,
    CommandContent,
    CommandDivider,
    CommandItem,
    CommandSearch,
    Registry,
  } from "$lib/command/index.js";
  import { events } from "$lib/index.js";
  import { Modal } from "$lib/modal/index.js";
  import { Shortcut, ShortcutBadge } from "$lib/shortcut/index.js";
  import { match } from "$lib/utils.js";
  import { Check, ChevronRight } from "@lucide/svelte";

  export type CommanderProps = {
    open?: boolean;
    query?: string;
    command: Registry;
  };
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    query = $bindable(""),
    command,
  }: CommanderProps = $props();

  let actions = $derived(
    command.actions.filter(
      (action) =>
        action.enabled() &&
        (match(action.id, query) ||
          (action.category && match(action.category, query)) ||
          match(action.name, query) ||
          match(action.description, query)),
    ),
  );

  let categoryHasSelected = $derived(
    actions.reduce(
      (acc, { category, selected }) => ({
        ...acc,
        [category]: acc[category] || selected !== undefined,
      }),
      {} as Record<string, boolean>,
    ),
  );

  function handleSelect(action: Action) {
    action.callback();
    open = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    const action = command.getByShortcut(Shortcut.fromEvent(event));
    if (action && action.enabled()) {
      action.callback();
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  $effect(() => {
    return events.on("keydown", handleKeyDown);
  });
</script>

<Modal
  bind:open
  onoutroend={() => (query = "")}
  class="h-[min(60%,48em)] w-[min(calc(100%-1em),36em)] rounded-lg bg-m3-surface-container p-0"
>
  <Command>
    <CommandSearch bind:value={query} />
    <CommandDivider />
    <CommandContent>
      {#if actions.length > 0}
        {#each actions as action (action.id)}
          <CommandItem
            onSelect={() => handleSelect(action)}
            title={action.description}
          >
            <action.icon size={14} class="mr-2" />
            <div>{action.category}</div>
            <ChevronRight size={14} />
            {#if categoryHasSelected[action.category]}
              {#if action.selected?.()}
                <Check size={16} class="text-m3-primary" />
              {:else}
                <div class="size-4"></div>
              {/if}
            {/if}
            <div>{action.name}</div>
            {#if action.shortcut}
              <ShortcutBadge class="ml-auto" shortcut={action.shortcut} />
            {/if}
          </CommandItem>
        {/each}
      {:else}
        <div class="text-center">No results found.</div>
      {/if}
    </CommandContent>
  </Command>
</Modal>
