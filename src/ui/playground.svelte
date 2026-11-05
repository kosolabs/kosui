<script lang="ts">
  import type { Snippet } from "svelte";

  export type PlaygroundProps = {
    component?: Snippet<[]>;
    controls?: Snippet<[]>;
    code?: Snippet<[]>;
  };
  let { component, controls, code }: PlaygroundProps = $props();
</script>

<div class="playground">
  <div class="responsive">
    {#if component}
      <div data-testid="preview" class="component">
        {@render component()}
      </div>
    {/if}
    {#if controls}
      <div class="controls">
        {@render controls()}
      </div>
    {/if}
  </div>
  {#if code}
    <div class="code">
      {@render code()}
    </div>
  {/if}
</div>

<style>
  .playground {
    border-radius: var(--radius-md);
    border-width: 1px;
  }

  .responsive {
    display: flex;

    @media (max-width: 64rem) {
      flex-direction: column;
    }
  }

  .component {
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing) * 4);
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 4);

    @media (max-width: 64rem) {
      border-top-width: 1px;
    }
    @media (min-width: 64rem) {
      border-left-width: 1px;
    }
  }

  .code {
    background-color: rgb(from var(--md-sys-color-surface-container) r g b / 1);
    border-top-width: 1px;
    border-bottom-right-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
    padding: calc(var(--spacing) * 4);
    font-size: var(--text-sm);
  }
</style>
