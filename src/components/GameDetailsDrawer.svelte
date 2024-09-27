<script lang="ts">
  import type { GamesRecord } from "$lib/pocketbase-types";
  import { CalendarClock, Star } from "lucide-svelte";
  import CountdownTimer from "./CountdownTimer.svelte";
  import { onMount } from "svelte";
  import { gameReleased, getFutureMonthYear } from "$lib/utils";
  import ModalCloseButton from "./modals/ModalCloseButton.svelte";

  export let game: GamesRecord | undefined;
  export let number = 0;
  export let isDrawerOpen = false;
  export let playGame = () => {};
  let drawer: HTMLElement;

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (isDrawerOpen) {
        isDrawerOpen = false;
      }
    });
  });
</script>

{#if isDrawerOpen}
  <!-- Overlay -->
  <div
    class={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    on:click={() => (isDrawerOpen = false)}
    role="presentation"
  />

  <!-- Drawer -->
  <div
    class={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      isDrawerOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {#if gameReleased(game)}
      <div class="flex flex-col h-full p-4">
        <div class="flex-1 p-6">
          <h2 class="text-xl font-semibold">{game?.name}</h2>
          {@html game.description}
          <div class="flex gap-2">
            <button
              on:click={() => {
                playGame();
                isDrawerOpen = false;
              }}
              class="flex-1 bg-slate-100 border border-slate-300 rounded active:scale-95 transition-all text-xl text-slate-700 p-3"
              >Play</button
            >
            <button
              class=" bg-slate-100 border border-slate-300 rounded active:scale-95 transition-all text-xl text-slate-700 p-3"
              ><Star /></button
            >
          </div>
        </div>
      </div>
    {:else}
      <div class="flex flex-col justify-center mt-16 items-center m-4">
        <CalendarClock size="2rem" class="text-slate-400" />
        <h4 class="text-lg text-slate-800">This game is not released yet.</h4>
        {#if game !== undefined}
          <CountdownTimer targetDate={game?.released} />
        {:else}
          <h4 class="text-xl font-bold">{getFutureMonthYear(number)}</h4>
        {/if}

        <hr />
        <div class="border border-slate-400 rounded w-full p-2 flex flex-col">
          <h4 class="text-lg">Email me when the game is released</h4>
          <div class="flex gap-2">
            <input
              type="email"
              class="flex-1 border border-slate-300 rounded p-2"
              placeholder="Email"
            />
            <button class="bg-slate-100 border border-slate-300 rounded p-2"
              >Submit</button
            >
          </div>
        </div>
      </div>
    {/if}
    <ModalCloseButton buttonPressed={() => (isDrawerOpen = false)} />
  </div>
{/if}
