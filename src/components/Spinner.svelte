<script lang="ts">
  import { LoaderCircle } from "lucide-svelte";
  import { onDestroy, onMount } from "svelte";

  let totalTime = 0.0;
  let interval: number;

  onMount(() => {
    interval = setInterval(() => {
      totalTime += 0.1;
    }, 100);
  });
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div
  class="p-4 flex flex-col rounded border-slate-500 items-center justify-center"
>
  <LoaderCircle class="animate-spin text-2xl" />
  <span class="text-xl">Chargement...</span>
  <span class="text-slate-600 text-xs">{Math.floor(totalTime)}s</span>
</div>
