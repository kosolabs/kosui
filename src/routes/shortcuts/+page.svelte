<script lang="ts">
  import { Shortcut, ShortcutHint } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";

  let key = $state("k");
  let mod = $state(true);
  let ctrl = $state(false);
  let alt = $state(false);
  let shift = $state(false);
  let meta = $state(false);
  let pressed: Shortcut | undefined = $state();

  const shortcut = $derived(new Shortcut({ key, mod, ctrl, alt, shift, meta }));
  const options = $derived(
    Object.entries({ mod, ctrl, alt, shift, meta })
      .filter(([, on]) => on)
      .map(([name]) => `${name}: true`),
  );

  let presses = $derived.by(() => {
    void shortcut;
    return 0;
  });

  function onkeydown(event: KeyboardEvent) {
    if (["Alt", "Control", "Meta", "Shift"].includes(event.key)) return;
    pressed = Shortcut.fromEvent(event);
    if (shortcut.matches(event)) {
      event.preventDefault();
      presses++;
    }
  }
  import { docs } from "./docs.js";
</script>

<svelte:window {onkeydown} />

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-4 text-center">
          <ShortcutHint {shortcut} class="text-base" />
          <p class="text-sm" aria-live="polite">
            {presses === 0
              ? "Press it anywhere on the page"
              : `Matched ${presses} ${presses === 1 ? "time" : "times"}`}
          </p>
          <p class="flex items-center gap-2 text-sm text-m3-on-surface-variant">
            Last pressed:
            {#if pressed}
              <ShortcutHint shortcut={pressed} />
            {:else}
              nothing yet
            {/if}
          </p>
        </div>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={key}
          options={["k", "Enter", "ArrowUp", "/"]}
          label="Key"
        />
        <SwitchSetting bind:value={mod} label="mod" />
        <SwitchSetting bind:value={ctrl} label="ctrl" />
        <SwitchSetting bind:value={alt} label="alt" />
        <SwitchSetting bind:value={shift} label="shift" />
        <SwitchSetting bind:value={meta} label="meta" />
      {/snippet}
      {#snippet code()}
        <Code
          component="ShortcutHint"
          components={["Shortcut"]}
          defaults={{}}
          values={{}}
          expressions={{
            shortcut: `new Shortcut({ ${[`key: "${key}"`, ...options].join(", ")} })`,
          }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
