<script lang="ts">
  import { Button, CircularProgress } from "#lib/index.js";

  let progress: number | undefined = $state();

  function upload() {
    progress = 0;
    const timer = setInterval(() => {
      progress = Math.min((progress ?? 0) + 0.1, 1);
      if (progress === 1) clearInterval(timer);
    }, 300);
  }
</script>

<div class="flex flex-col items-center gap-3">
  <Button onclick={upload} disabled={progress !== undefined && progress < 1}>
    Upload report.pdf
  </Button>
  <CircularProgress
    progress={progress ?? 0}
    size="lg"
    aria-label="report.pdf upload"
  >
    {Math.round((progress ?? 0) * 100)}%
  </CircularProgress>
</div>
