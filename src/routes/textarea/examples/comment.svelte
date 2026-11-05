<script lang="ts">
  import { Button, Textarea } from "#lib/index.js";

  let comment = $state("");
  let comments: string[] = $state([]);
</script>

<div class="flex w-full max-w-md flex-col gap-3">
  <form
    class="flex items-start gap-2"
    onsubmit={(event) => {
      event.preventDefault();
      comments.unshift(comment.trim());
      comment = "";
    }}
  >
    <Textarea
      rows={1}
      aria-label="Comment"
      placeholder="Add a comment"
      class="field-sizing-content max-h-40 flex-1 resize-none"
      bind:value={comment}
    />
    <Button type="submit" variant="filled" disabled={!comment.trim()}>
      Post
    </Button>
  </form>
  <ul class="flex flex-col gap-1 text-sm">
    {#each comments as posted, index (index)}
      <li>{posted}</li>
    {/each}
  </ul>
</div>
