<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import Game from "../components/Game.svelte";
  import type { GamesRecord } from "$lib/pocketbase-types";
  import CountdownTimer from "../components/CountdownTimer.svelte";
  import GameDetailsDrawer from "../components/GameDetailsDrawer.svelte";
  import AboutModal from "../components/AboutModal.svelte";
  import ModalFrame from "../components/ModalFrame.svelte";
  import { ArrowUp } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import LogoPicker from "../components/LogoPicker.svelte";
  import Logo00 from "../components/logos/Logo00.svelte";

  let isDrawerOpen = false;
  let isPlayingModalOpen = false;
  let aboutModalOpen = false;
  let showBackToTop = false;

  function handleScroll() {
    showBackToTop = window.scrollY > 100;
  }

  let games: GamesRecord[] = [];
  let nextReleasedGame: GamesRecord;
  let selectedGame: GamesRecord | undefined;
  let selectedGameNumber: number;

  async function fetchGames() {
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
          if (
            gameReleaseDate > now &&
            (!nextReleasedGame ||
              gameReleaseDate < new Date(nextReleasedGame.released))
          ) {
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

  function playGame() {
    isPlayingModalOpen = true;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>

<svelte:head>
  <title>Aymeri's 100</title>

  <meta property="og:title" content="Aymeri's 100" />
  <meta
    property="og:description"
    content="Free new games every month, ending in December 2032."
  />
  <meta property="og:image" content="logo.png" />
  <meta property="og:url" content="https://100.aymeri.dev" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@aymeridev" />
  <meta name="twitter:title" content="Aymeri's 100" />
  <meta
    name="twitter:description"
    content="Free new games every month, ending in December 2032."
  />
  <meta name="twitter:image" content="logo.png" />
</svelte:head>

<svelte:window on:scroll={handleScroll} />

<div
  class="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(210,100%,100%,0)_0,rgba(173,216,230,0.5)_100%)] animate-pulse-gradient"
></div>

<nav class="flex justify-center w-full my-4">
  <button
    class="bg-white rounded-full p-2 hover:bg-slate-100 active:scale-95 border hover:border-slate-300 transition-all shadow-md"
    on:click={() => (aboutModalOpen = true)}>About</button
  >
</nav>
<main class="m-auto max-w-5xl">
  <div class="flex flex-col gap-8 items-center justify-center mt-8 mb-8">
    <div class="flex flex-col items-center gap-4">
      <h2 class="bg-black text-white rounded font-bold text-5xl px-4 italic">
        AYMERI'S
      </h2>
      <Logo00 />
    </div>
    {#if nextReleasedGame}
      <div class="flex flex-col items-center">
        <h3 class="text-lg font-bold">Next game in...</h3>
        <CountdownTimer targetDate={nextReleasedGame?.released} />
      </div>
    {/if}
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

{#if showBackToTop}
  <div
    class="fixed bottom-4 right-4 bg-slate-200 border border-slate-400 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
    on:click={scrollToTop}
    transition:fly={{ x: 100, duration: 100 }}
  >
    <ArrowUp size="1.5rem" />
  </div>
{/if}
{#if selectedGame}
  <ModalFrame bind:isOpen={isPlayingModalOpen} bind:game={selectedGame} />
{/if}

<AboutModal
  closeModal={() => (aboutModalOpen = false)}
  bind:isOpen={aboutModalOpen}
/>

<GameDetailsDrawer
  bind:isDrawerOpen
  game={selectedGame}
  bind:number={selectedGameNumber}
  {playGame}
/>

<style>
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

  .animate-pulse-gradient {
    animation: pulse-gradient 4s infinite ease-in-out;
  }
</style>
