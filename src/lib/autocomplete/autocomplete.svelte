<script module lang="ts">
  import { Input, type InputProps } from "#lib/input/index.js";
  import { mergeComponentProps } from "#lib/merge-props.js";
  import { Popover } from "#lib/popover/index.js";
  import { Shortcut } from "#lib/shortcut/index.js";
  import type { Snippet } from "svelte";

  export type AutocompleteProps<T> = {
    options: T[];
    getOptionLabel?: (option: T) => string;
    option?: Snippet<[T]>;
    onSelect?: (option: T) => void;
  } & InputProps;
</script>

<script lang="ts" generics="T">
  let {
    value = $bindable(""),
    el = $bindable(),
    options,
    getOptionLabel = String,
    option: optionSnippet,
    onSelect,
    ...restProps
  }: AutocompleteProps<T> = $props();

  const id = $props.id();
  let expanded = $state(false);
  let active = $state(-1);

  const open = $derived(expanded && options.length > 0);
  const current = $derived(open && active < options.length ? active : -1);

  function choose(option: T) {
    value = getOptionLabel(option);
    expanded = false;
    active = -1;
    onSelect?.(option);
  }

  function move(step: 1 | -1) {
    const count = options.length;
    if (!open) {
      expanded = true;
      active = step === 1 ? 0 : count - 1;
    } else if (current === -1) {
      active = step === 1 ? 0 : count - 1;
    } else {
      active = (current + step + count) % count;
    }
  }

  function onkeydown(event: KeyboardEvent) {
    if (Shortcut.ARROW_DOWN.matches(event)) {
      move(1);
    } else if (Shortcut.ARROW_UP.matches(event)) {
      move(-1);
    } else if (Shortcut.ENTER.matches(event) && current !== -1) {
      choose(options[current]);
    } else if (Shortcut.ESCAPE.matches(event) && open) {
      expanded = false;
      event.stopPropagation();
    } else {
      if (event.key === "Tab") expanded = false;
      return;
    }
    event.preventDefault();
  }

  $effect(() => {
    if (current !== -1) {
      document
        .getElementById(`${id}-${current}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  });
</script>

<Input
  bind:value
  bind:el
  role="combobox"
  autocomplete="off"
  aria-autocomplete="list"
  aria-expanded={open}
  aria-controls={open ? `${id}-listbox` : undefined}
  aria-activedescendant={current === -1 ? undefined : `${id}-${current}`}
  {...mergeComponentProps(
    Input,
    {
      oninput: () => {
        expanded = true;
        active = -1;
      },
      onkeydown,
      onblur: () => (expanded = false),
    },
    restProps,
  )}
/>

<Popover
  bind:open={
    () => open,
    (next) => {
      if (!next) expanded = false;
    }
  }
  anchorEl={el}
  placement="bottom-start"
  id="{id}-listbox"
  role="listbox"
  class="max-h-72 min-w-[anchor-size(width)] overflow-y-auto rounded-sm bg-m3-surface-container p-1 text-m3-on-surface shadow-md shadow-m3-shadow/20"
>
  {#each options as option, index (index)}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      id="{id}-{index}"
      role="option"
      tabindex="-1"
      aria-selected={index === current}
      class="flex min-h-8 cursor-pointer items-center gap-2 rounded-sm px-3 py-1 text-sm aria-selected:bg-m3-on-surface/10"
      onmousedown={(event) => event.preventDefault()}
      onpointermove={() => (active = index)}
      onclick={() => choose(option)}
    >
      {#if optionSnippet}
        {@render optionSnippet(option)}
      {:else}
        {getOptionLabel(option)}
      {/if}
    </div>
  {/each}
</Popover>
