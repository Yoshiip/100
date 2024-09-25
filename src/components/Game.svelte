<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import { getFutureMonthYear } from "$lib/utils";

  export let number = 0;
  export let game: GamesRecord;

  console.log(game);
</script>

<button class="w-full max-w-xs h-48 relative border-gray-200 border rounded">
  <!-- background -->
  {#if game.cover}
    <img
      src={pb.files.getUrl(game, game.cover)}
      aria-hidden="true"
      class="absolute left-0 top-0 right-0 bottom-0 object-cover"
      alt="Game Cover"
    />
  {/if}
  <span
    class="font-bold italic opacity-25 -z-10 text-2xl absolute right-4 bottom-2 select-none"
    aria-hidden="true">{number + 1}</span
  >
  <span
    class="font-bold italic opacity-25 -z-10 text-md uppercase absolute left-4 bottom-2 select-none"
    aria-hidden="true">{getFutureMonthYear(number)}</span
  >
  <h2 class="text-2xl">{game.name}</h2>
</button>
