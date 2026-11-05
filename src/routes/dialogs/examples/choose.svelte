<script lang="ts">
  import { Button, getDialogs } from "#lib/index.js";

  type Speed = "standard" | "express";

  const dialogs = getDialogs();
  let speed: Speed | undefined = $state();

  async function choose() {
    speed = await dialogs.show<Speed>({
      title: "Choose shipping",
      message: "Standard arrives in 5–7 days. Express arrives tomorrow.",
      actions: [
        { text: "Standard", value: "standard", variant: "plain" },
        { text: "Express", value: "express", variant: "filled", default: true },
      ],
    });
  }
</script>

<div class="flex flex-col items-center gap-3">
  <Button variant="tonal" onclick={choose}>Ship order</Button>
  <p class="text-sm" aria-live="polite">Shipping: {speed ?? "not chosen"}</p>
</div>
