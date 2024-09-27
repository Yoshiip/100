<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { pb } from "$lib/pocketbase";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import { gameReleased, getFutureMonthYear } from "$lib/utils";
  import { blur, fade, fly, scale } from "svelte/transition";

  export let number = 0;
  export let game: GamesRecord | undefined;
  export let cardClicked = (game: number) => {};

  let rotationX = 0;
  let rotationY = 0;

  function handleMouseMove(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calcul des rotations
    rotationX = (y / rect.height - 0.5) * -20; // rotation X (haut/bas)
    rotationY = (x / rect.width - 0.5) * 20; // rotation Y (gauche/droite)
  }

  function resetTransform() {
    rotationX = 0;
    rotationY = 0;
  }

  let visible = false;
  afterNavigate(() => {
    resetTransform();
    visible = true;
  });
</script>

{#if visible}
  <button
    on:mousemove={handleMouseMove}
    on:mouseleave={resetTransform}
    style="transform: perspective(600px) rotateX({rotationX}deg) rotateY({rotationY}deg);"
    class="group w-full aspect-video max-w-xs relative border-gray-200 border rounded shadow-lg transition-all duration-200 ease-out hover:border-gray-300 hover:shadow-2xl"
    on:click={() => {
      cardClicked(number);
    }}
    in:scale={{ duration: 200, delay: (number - 1) * 25 }}
  >
    {#if gameReleased(game) && game !== undefined}
      {#if game.cover}
        <img
          src={pb.files.getUrl(game, game.cover)}
          aria-hidden="true"
          class="absolute left-0 top-0 right-0 bottom-0 object-cover pointer-events-none -z-10"
          alt="Game Cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"
        >
          <h5 class="font-semibold text-left ml-4">{game.name}</h5>
        </div>
      {:else}
        <div
          class="absolute left-0 top-0 right-0 h-8 bg-gradient-to-b from-gray-500 text-white"
        >
          <span
            class="font-bold italic opacity-25 -z-10 text-2xl absolute right-4 top-2 select-none"
            aria-hidden="true">{number + 1}</span
          >
          <span
            class="font-bold italic opacity-25 -z-10 text-md uppercase absolute left-4 top-2 select-none"
            aria-hidden="true">{getFutureMonthYear(number)}</span
          >
        </div>
        <h5 class="font-semibold ml-4">{game.name}</h5>
      {/if}
    {:else}
      <h2 class="text-xl text-slate-600">Upcoming...</h2>
    {/if}
    <div class="absolute left-0 top-0 right-0 h-8 text-white">
      <div class="bg-gradient-to-b from-black w-full h-full opacity-50" />
      <span
        class="font-bold italic text-2xl absolute right-4 top-2 select-none"
        aria-hidden="true">{number + 1}</span
      >
      <span
        class="font-bold italic text-white text-md uppercase absolute left-4 top-2 select-none"
        aria-hidden="true">{getFutureMonthYear(number)}</span
      >
    </div>
  </button>
{/if}
