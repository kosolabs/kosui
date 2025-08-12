<script module lang="ts">
  import { Input, type InputProps } from "$lib";
  import { getAutocompleteContext } from "./autocomplete-context.svelte";

  export type AutocompleteInputProps = InputProps;
</script>

<script lang="ts">
  import { mergeComponentProps } from "../merge-props";

  let {
    el = $bindable(),
    value = $bindable(""),
    ...restProps
  }: AutocompleteInputProps = $props();

  const ctx = getAutocompleteContext();
  ctx.bindInput(
    () => value,
    (newval) => (value = newval),
  );
  ctx.bindAnchorEl(
    () => el,
    (newval) => (el = newval),
  );

  function handleKeyDown(event: KeyboardEvent) {
    ctx.handleKeyDown(event);
  }
</script>

<Input
  bind:el={ctx.anchorEl}
  bind:value={ctx.input}
  autocomplete="off"
  {...mergeComponentProps(Input, { onkeydown: handleKeyDown }, restProps)}
/>
