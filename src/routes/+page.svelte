<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import Game from "../components/Game.svelte";
  import Upcoming from "../components/Upcoming.svelte";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import CountdownTimer from "../components/CountdownTimer.svelte";

  let isDrawerOpen = false;

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }

  let games: GamesRecord[] = [];
  let nextReleasedGame: GamesRecord;

  function fetchGames() {
    pb.collection("games")
      .getFullList({
        sort: "number",
      })
      .then((data) => {
        games = data as unknown as GamesRecord[];
        let now = new Date();
        games.forEach((game) => {
          let gameReleaseDate = new Date(game.released);
          if (gameReleaseDate > now) {
            nextReleasedGame = game;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onMount(() => {
    fetchGames();
  });
</script>

<svelte:head>
  <title>Aymeri's 100</title>
</svelte:head>

<nav class="m-auto">
  <button class="p-4" on:click={toggleDrawer}>FAQ</button>
  <CountdownTimer targetDate={nextReleasedGame?.released} />
</nav>

<main>
  <div class="grid grid-cols-4 gap-4">
    {#if games}
      {#each Array.from({ length: 100 }) as _, i}
        {#if games[i] !== undefined}
          <Game number={i} game={games[i]} />
        {:else}
          <Upcoming number={i} />
        {/if}
      {/each}
    {/if}
  </div>

  <!-- Overlay -->
  <div
    class={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    on:click={toggleDrawer}
  ></div>

  <!-- Drawer -->
  <div
    class={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      isDrawerOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div class="p-6">
      <h2 class="text-xl font-semibold">Menu</h2>
      <ul class="mt-4 space-y-4">
        <li>
          <a href="#" class="text-gray-700 hover:text-blue-600">Lien 1</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-blue-600">Lien 2</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-blue-600">Lien 3</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-blue-600">Lien 4</a>
        </li>
      </ul>

      <!-- Bouton pour fermer le Drawer -->
      <button
        on:click={toggleDrawer}
        class="mt-6 px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Fermer
      </button>
    </div>
  </div>
</main>
