<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import { gameReleased, getFutureMonthYear } from "$lib/utils";
  import { CircleHelp } from "lucide-svelte";

  export let number = 0;
  export let game: GamesRecord | undefined;
  export let cardClicked = (game: number) => {};

  let rotationX = 0;
  let rotationY = 0;
  let isHovered = false;

  function handleMouseMove(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    rotationX = (y / rect.height - 0.5) * -25;
    rotationY = (x / rect.width - 0.5) * 25;
  }

  function resetTransform() {
    rotationX = 0;
    rotationY = 0;
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
    resetTransform();
  }
</script>

<button
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="group w-full aspect-video bg-white max-w-xs relative border-gray-200 border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:border-gray-300"
  on:click={() => {
    cardClicked(number);
  }}
  style="transform: perspective(600px) rotateX({rotationX}deg) rotateY({rotationY}deg);"
>
  {#if game && gameReleased(game)}
    <img
      src={pb.files.getUrl(game, game.cover)}
      class="absolute left-0 top-0 right-0 bottom-0 object-cover pointer-events-none -z-10 rounded-lg"
      alt="Game Cover"
    />
    <div
      class="absolute bottom-0 left-0 right-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out rounded-b-lg"
    >
      <h5 class="font-semibold text-left ml-4">{game.name}</h5>
    </div>
    <div class="absolute left-0 top-0 right-0 h-8 text-white">
      <div class="bg-gradient-to-b from-black opacity-50 h-10 rounded-t-lg" />
      <span class="font-bold italic text-2xl absolute right-4 top-2 select-none"
        >{number + 1}</span
      >
      <span
        class="font-bold italic text-md uppercase absolute left-4 top-2 select-none"
        >{getFutureMonthYear(number)}</span
      >
    </div>
  {:else}
    <div
      class="text-slate-600 flex items-center justify-center flex-col rounded-lg"
    >
      <CircleHelp />
      <h2 class="text-lg">Upcoming...</h2>
    </div>
    <div class="absolute left-0 top-0 right-0 h-8 text-slate-500">
      <span
        class="font-bold italic text-2xl absolute right-4 top-2 select-none"
        aria-hidden="true">{number + 1}</span
      >
      <span
        class="font-bold italic text-md uppercase absolute left-4 top-2 select-none"
        aria-hidden="true">{getFutureMonthYear(number)}</span
      >
    </div>
  {/if}
</button>
