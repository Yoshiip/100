<script lang="ts">
  import type { GamesRecord } from "$lib/pocketbase-types";
  import { CalendarClock, Star, Play } from "lucide-svelte";
  import CountdownTimer from "./CountdownTimer.svelte";
  import { onMount } from "svelte";
  import { gameReleased, getFutureMonthYear } from "$lib/utils";
  import ModalCloseButton from "./modals/ModalCloseButton.svelte";
  import { fade, fly } from "svelte/transition";
  import { pb } from "$lib/pocketbase";

  export let game: GamesRecord | undefined;
  export let number = 0;
  export let isDrawerOpen = false;
  export let playGame = () => {};
</script>

{#if isDrawerOpen}
  <!-- Overlay -->
  <div
    on:scroll={() => (isDrawerOpen = false)}
    class="fixed inset-0 bg-black bg-opacity-50"
    on:click={() => (isDrawerOpen = false)}
    role="presentation"
    transition:fade={{ duration: 150 }}
  />

  <!-- Drawer -->
  <div
    class="fixed top-0 right-0 h-full overflow-y-auto w-full max-w-xl bg-white shadow-lg"
    transition:fly={{ x: 100, duration: 150 }}
  >
    {#if gameReleased(game)}
      <img
        src={pb.files.getUrl(game, game.cover)}
        aria-hidden="true"
        class="w-full aspect-video"
      />
      <div class="flex flex-col h-full p-4">
        <div class="flex-1 p-6 gap-4">
          <div class="flex text-slate-600">
            <span class="font-bold italic text-md uppercase"
              >{getFutureMonthYear(number)}</span
            >
            <div class="flex-1" />
            <span class="font-bold italic text-2xl select-none">1</span>
          </div>
          <h2 class="text-xl font-semibold">{game?.name}</h2>
          <div class="prose"></div>
          <div
            class="modal-content prose prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-p:mb-4 prose-ul:ml-6 prose-li:mb-2 prose-strong:font-bold"
          >
            {@html game.description}
          </div>

          <button
            on:click={() => {
              playGame();
              isDrawerOpen = false;
            }}
            class="sticky bottom-4 left-4 right-4 w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-700 text-white border border-slate-300 rounded active:scale-95 transition-all font-bold text-xl p-3 flex flex-row gap-2 items-center justify-center"
          >
            <Play />
            Play
          </button>
        </div>
      </div>
    {:else}
      <div class="flex flex-col justify-center mt-16 items-center m-4 p-4">
        <CalendarClock size="2rem" class="text-slate-400" />
        <h4 class="text-lg text-slate-800">This game is not released yet.</h4>
        {#if game !== undefined}
          <CountdownTimer targetDate={game?.released} />
        {:else}
          <h4 class="text-xl font-bold">{getFutureMonthYear(number)}</h4>
        {/if}
      </div>
    {/if}
    <ModalCloseButton buttonPressed={() => (isDrawerOpen = false)} />
  </div>
{/if}
