<script lang="ts">
  import { Button, Shortcut, ShortcutHint, Textarea } from "#lib/index.js";

  const send = new Shortcut({ key: "Enter", mod: true });
  let message = $state("");
  let sent = $state("");

  function submit() {
    sent = message;
    message = "";
  }
</script>

<div class="flex w-full max-w-md flex-col gap-2">
  <Textarea
    bind:value={message}
    aria-label="Message"
    placeholder="Write a message"
    onkeydown={(event) => {
      if (send.matches(event)) {
        event.preventDefault();
        submit();
      }
    }}
  />
  <div class="flex items-center justify-between gap-2">
    <p class="text-sm" aria-live="polite">{sent && `Sent: ${sent}`}</p>
    <Button variant="filled" onclick={submit}>
      Send <ShortcutHint shortcut={send} />
    </Button>
  </div>
</div>
