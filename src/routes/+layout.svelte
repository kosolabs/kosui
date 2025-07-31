<script module lang="ts">
  import { Goto, toTitleCase } from "$lib";
  import { Breadcrumbs } from "$lib/breadcrumbs";
  import { type Snippet } from "svelte";
  import "../app.css";

  const paths = [
    "/alerts",
    "/autocomplete",
    "/avatar",
    "/badge",
    "/buttons",
    "/chips",
    "/command",
    "/dialogs",
    "/fab",
    "/goto",
    "/inputs",
    "/links",
    "/markdown",
    "/menus",
    "/progress-indicators",
    "/shortcuts",
    "/toggles",
    "/tooltips",
  ];
</script>

<script lang="ts">
  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="flex h-screen flex-col">
  <div class="border-b p-4">
    <h1 class="text-3xl font-thin">
      <Breadcrumbs />
    </h1>
  </div>
  <div class="flex min-h-0 flex-1">
    <aside class="flex flex-col items-start overflow-y-auto border-r p-6">
      {#each paths as path (path)}
        <Goto href={path}>
          {toTitleCase(path.split("/").slice(-1)[0])}
        </Goto>
      {/each}
    </aside>

    <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {@render children()}
    </div>
  </div>
</div>
