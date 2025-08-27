<script module lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { Link, toTitleCase } from "$lib/index.js";
  import { KosuiLogo } from "$ui";
  import { type Snippet } from "svelte";
  import "../app.css";

  const paths = [
    resolve("/alerts"),
    resolve("/autocomplete"),
    resolve("/avatar"),
    resolve("/badge"),
    resolve("/breadcrumbs"),
    resolve("/buttons"),
    resolve("/chips"),
    resolve("/command"),
    resolve("/dialogs"),
    resolve("/fab"),
    resolve("/input"),
    resolve("/links"),
    resolve("/markdown"),
    resolve("/menus"),
    resolve("/progress-indicators"),
    resolve("/slider"),
    resolve("/switch"),
    resolve("/shortcuts"),
    resolve("/skeleton"),
    resolve("/textarea"),
    resolve("/toggles"),
    resolve("/tooltips"),
  ];
</script>

<script lang="ts">
  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="flex h-screen flex-col">
  <div class="flex items-center gap-2 border-b p-4">
    <KosuiLogo />
    <h1 class="text-3xl font-thin">
      {toTitleCase(page.url.pathname.split("/")[1]) || "Home"}
    </h1>
  </div>
  <div class="flex min-h-0 flex-1">
    <aside class="flex flex-col items-start overflow-y-auto border-r p-6">
      {#each paths as path (path)}
        <Link href={path}>
          {toTitleCase(path.split("/").slice(-1)[0])}
        </Link>
      {/each}
    </aside>

    <div title="content" class="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {@render children()}
    </div>
  </div>
</div>
