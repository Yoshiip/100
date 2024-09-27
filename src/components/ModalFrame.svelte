<script lang="ts">
  import type { GamesRecord } from "$lib/pocketbase-types";

  export let game: GamesRecord;
</script>

<!-- overlay -->
<div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>

<dialog
  class="fixed inset-0 bg-black bg-opacity-50 z-50"
  style="display: block;"
>
  <iframe src={game.link} frameborder="0" title="Game" width="800" height="640"
  ></iframe>
  <button>Fullscreen</button>
</dialog>
