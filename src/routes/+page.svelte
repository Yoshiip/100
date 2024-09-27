<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import Game from "../components/Game.svelte";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import CountdownTimer from "../components/CountdownTimer.svelte";
  import GameDetailsDrawer from "../components/GameDetailsDrawer.svelte";
  import AboutModal from "../components/AboutModal.svelte";
  import ModalFrame from "../components/ModalFrame.svelte";
  import { fly } from "svelte/transition";

  let isDrawerOpen = false;

  let games: GamesRecord[] = [];
  let nextReleasedGame: GamesRecord;
  let selectedGame: GamesRecord | undefined;
  let selectedGameNumber: number;

  function fetchGames() {
    pb.collection("games")
      .getFullList({
        sort: "number",
        expand: "tool",
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

  function gameCardClicked(number: number) {
    selectedGame = games[number];
    selectedGameNumber = number;
    isDrawerOpen = true;
  }

  let isPlayingModalOpen = false;

  function playGame() {
    isPlayingModalOpen = true;
  }
</script>

<svelte:head>
  <title>Aymeri's 100</title>
</svelte:head>

<button
  class="bg-slate-200 border border-slate-400 p-2 rounded hover:bg-slate-100"
  >About</button
>

<div
  class="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(210,100%,100%,0)_0,rgba(173,216,230,0.5)_100%)] animate-pulse-gradient"
></div>

<main class="m-auto max-w-5xl">
  <div class="flex flex-col items-center justify-center mt-16 mb-12">
    <div class="flex flex-col items-center">
      <h2 class="bg-black text-white font-bold text-5xl px-4 italic">
        AYMERI'S
      </h2>
      <h1 class="text-9xl font-black italic mb-8">100</h1>
    </div>
    <h4 class="text-lg">Next game in...</h4>
    <CountdownTimer targetDate={nextReleasedGame?.released} />
  </div>
  <div
    class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
  >
    {#if games}
      {#each Array.from({ length: 100 }) as _, i}
        <Game number={i} game={games[i]} cardClicked={gameCardClicked} />
      {/each}
    {/if}
  </div>
</main>

{#if isPlayingModalOpen && selectedGame}
  <ModalFrame bind:game={selectedGame} />
{/if}

<AboutModal closeModal={() => {}} isOpen={false} />

<GameDetailsDrawer
  bind:isDrawerOpen
  game={selectedGame}
  bind:number={selectedGameNumber}
  {playGame}
/>

<style>
  /* Animation Pulse */
  @keyframes pulse-gradient {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  /* Classe pour ajouter l'animation */
  .animate-pulse-gradient {
    animation: pulse-gradient 4s infinite ease-in-out;
  }
</style>
