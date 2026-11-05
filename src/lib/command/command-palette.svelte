<script module lang="ts">
  import { events } from "#lib/index.js";
  import { Modal } from "#lib/modal/index.js";
  import { Shortcut, ShortcutHint } from "#lib/shortcut/index.js";
  import { match } from "#lib/utils.js";
  import { Check, Search } from "@lucide/svelte";
  import type { Action, Registry } from "./action.svelte";

  export type CommandPaletteProps = {
    registry: Registry;
    open?: boolean;
    query?: string;
    label?: string;
    placeholder?: string;
  };

  function isTyping(event: KeyboardEvent) {
    return (
      event.target instanceof HTMLElement &&
      (event.target.isContentEditable ||
        event.target.matches("input, textarea, select"))
    );
  }
</script>

<script lang="ts">
  let {
    registry,
    open = $bindable(false),
    query = $bindable(""),
    label = "Command palette",
    placeholder = "Search commands",
  }: CommandPaletteProps = $props();

  const id = $props.id();
  let active = $state(0);

  const actions = $derived(
    registry.actions.filter(
      (action) =>
        action.enabled() &&
        (match(action.id, query) ||
          (action.category && match(action.category, query)) ||
          match(action.name, query) ||
          match(action.description, query)),
    ),
  );
  const current = $derived(Math.min(active, actions.length - 1));

  function run(action: Action) {
    open = false;
    action.callback();
  }

  function onkeydown(event: KeyboardEvent) {
    const count = actions.length;
    if (Shortcut.ARROW_DOWN.matches(event)) {
      active = (current + 1) % count;
    } else if (Shortcut.ARROW_UP.matches(event)) {
      active = (current - 1 + count) % count;
    } else if (Shortcut.ENTER.matches(event) && current !== -1) {
      run(actions[current]);
    } else {
      return;
    }
    event.preventDefault();
  }

  function runShortcut(event: KeyboardEvent) {
    const shortcut = Shortcut.fromEvent(event);
    if (isTyping(event) && !shortcut.ctrl && !shortcut.meta && !shortcut.alt) {
      return;
    }
    const action = registry.getByShortcut(shortcut);
    if (action?.enabled()) {
      action.callback();
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  $effect(() => events.on("keydown", runShortcut));

  $effect(() => {
    if (current !== -1) {
      document
        .getElementById(`${id}-${current}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  });
</script>

<Modal
  bind:open
  aria-label={label}
  class="flex h-[min(60vh,32rem)] w-[min(calc(100%-1em),36rem)] flex-col p-0"
  onoutroend={() => {
    query = "";
    active = 0;
  }}
>
  <div class="flex items-center gap-2 border-b border-m3-outline-variant px-4">
    <Search size={16} class="shrink-0 text-m3-on-surface-variant" />
    <!-- svelte-ignore a11y_autofocus -->
    <input
      bind:value={query}
      role="combobox"
      aria-label={placeholder}
      aria-autocomplete="list"
      aria-expanded="true"
      aria-controls="{id}-listbox"
      aria-activedescendant={current === -1 ? undefined : `${id}-${current}`}
      autocomplete="off"
      autofocus
      {placeholder}
      class="h-12 w-full bg-transparent outline-none placeholder:text-m3-on-surface-variant"
      oninput={() => (active = 0)}
      {onkeydown}
    />
  </div>
  <div
    id="{id}-listbox"
    role="listbox"
    aria-label={label}
    class="grow overflow-y-auto p-2"
  >
    {#each actions as action, index (action.id)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        id="{id}-{index}"
        role="option"
        tabindex="-1"
        aria-selected={index === current}
        aria-checked={action.selected?.()}
        title={action.description}
        class="flex min-h-9 cursor-pointer items-center gap-3 rounded-sm px-3 text-sm aria-selected:bg-m3-on-surface/10"
        onmousedown={(event) => event.preventDefault()}
        onpointermove={() => (active = index)}
        onclick={() => run(action)}
      >
        <action.icon size={16} class="shrink-0 text-m3-on-surface-variant" />
        <span class="grow">
          {#if action.category}
            <span class="text-m3-on-surface-variant">{action.category}:</span>
          {/if}
          {action.name}
        </span>
        {#if action.selected?.()}
          <Check size={16} class="shrink-0 text-m3-primary" />
        {/if}
        {#if action.shortcut}
          <ShortcutHint shortcut={action.shortcut} />
        {/if}
      </div>
    {/each}
  </div>
  <p
    role="status"
    class="absolute inset-x-0 top-1/2 text-center text-sm text-m3-on-surface-variant empty:hidden"
  >
    {actions.length === 0 ? "No matching commands" : ""}
  </p>
</Modal>
