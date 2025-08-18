<script lang="ts" module>
  import { Proxy } from "$lib/portal/index.js";
  import { mount, unmount, type Snippet } from "svelte";

  export type PortalProps = { children?: Snippet; target?: HTMLElement };
</script>

<script lang="ts">
  const { children, target = document.body }: PortalProps = $props();

  $effect(() => {
    const instance = mount(Proxy, { target, props: { children } });
    return () => unmount(instance);
  });
</script>
