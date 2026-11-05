<script lang="ts">
  import { Button } from "#lib/button/index.js";
  import { Input } from "#lib/input/index.js";
  import type { Snippet } from "svelte";
  import Dialog from "./dialog.svelte";
  import { Dialogs, setDialogs } from "./dialogs.svelte.js";

  let { children }: { children: Snippet } = $props();

  const id = $props.id();
  const dialogs = setDialogs(new Dialogs());
  const request = $derived(dialogs.current);
  let value = $derived(request?.value ?? "");
</script>

<Dialog
  bind:open={dialogs.open}
  icon={request?.icon}
  title={request?.title}
  aria-describedby="{id}-message"
  onSelect={(selected) => dialogs.settle(selected)}
>
  {#key request}
    <div id="{id}-message">
      {#if typeof request?.message === "function"}
        {@render request.message()}
      {:else}
        {request?.message}
      {/if}
    </div>
    {#if request?.input}
      <form
        id="{id}-form"
        class="mt-4"
        onsubmit={(event) => {
          event.preventDefault();
          dialogs.settle(value);
        }}
      >
        <Input
          bind:value
          aria-labelledby="{id}-message"
          autofocus
          {...request.input}
          class={["w-full", request.input.class]}
        />
      </form>
    {/if}
  {/key}

  {#snippet actions(select)}
    {#key request}
      {#each request?.actions ?? [] as action, i (i)}
        <Button
          variant={action.variant}
          color={action.color}
          shape={action.shape}
          autofocus={action.default}
          {...action.submit
            ? { type: "submit", form: `${id}-form` }
            : { onclick: () => select(action.value) }}
        >
          {action.text}
        </Button>
      {/each}
    {/key}
  {/snippet}
</Dialog>

{@render children()}
