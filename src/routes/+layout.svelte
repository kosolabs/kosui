<script module lang="ts">
  import { Breadcrumbs } from "$lib/breadcrumbs";
  import { type Snippet } from "svelte";
  import "../app.css";

  export const StorybookNavigationActionIds = {
    Alerts: "/alerts",
    Autocomplete: "/autocomplete",
    Avatar: "/avatar",
    Badge: "/badge",
    Buttons: "/buttons",
    Chips: "/chips",
    Command: "/command",
    Dialogs: "/dialogs",
    Fab: "/fab",
    Goto: "/goto",
    Inputs: "/inputs",
    Links: "/links",
    Markdown: "/markdown",
    Menus: "/menus",
    ProgressIndicators: "/progress-indicators",
    Shortcuts: "/shortcuts",
    Toggles: "/toggles",
    Tooltips: "/tooltips",
  };
</script>

<script lang="ts">
  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="flex flex-col gap-2 p-2">
  <h1 class="text-3xl font-thin">
    <Breadcrumbs />
  </h1>
  <hr />
  {@render children()}
</div>
