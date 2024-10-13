<script lang="ts">
  import { GAMES_COLLECTION_ID, pb } from "$lib/pocketbase";
  import GameCard from "../components/GameCard.svelte";
  import type { GamesResponse } from "$lib/pocketbase-types";
  import CountdownTimer from "../components/CountdownTimer.svelte";
  import GameDetailsDrawer from "../components/GameDetailsDrawer.svelte";
  import AboutModal from "../components/AboutModal.svelte";
  import ModalFrame from "../components/ModalFrame.svelte";
  import { Gamepad, Youtube, ArrowUp } from "lucide-svelte";
  import { blur } from "svelte/transition";
  import Logo00 from "../components/logos/Logo00.svelte";
  import PillButton from "../components/buttons/PillButton.svelte";
  import Spinner from "../components/Spinner.svelte";
  import BaseAlert from "../components/alerts/BaseAlert.svelte";
  import CircleButton from "../components/buttons/CircleButton.svelte";
  import PillLink from "../components/buttons/PillLink.svelte";
  import Background from "../components/Background.svelte";

  let isDrawerOpen = false;
  let aboutModalOpen = false;
  let showBackToTop = false;

  function handleScroll() {
    showBackToTop = window.scrollY > 100;
  }

  let modalFrame: ModalFrame;

  let games: GamesResponse[] = [];
  let nextReleasedGame: GamesResponse;
  let selectedGameNumber: number;

  let gameDetailsDrawer: GameDetailsDrawer;

  let gamesPromise = fetchGames();

  async function fetchGames(): Promise<GamesResponse[]> {
    games = await pb.collection("games_overview").getFullList({
      sort: "number",
    });
    let now = new Date();
    games.forEach((game) => {
      game.collectionId = GAMES_COLLECTION_ID;
      let gameReleaseDate = new Date(game.released);
      if (
        gameReleaseDate > now &&
        (!nextReleasedGame ||
          gameReleaseDate < new Date(nextReleasedGame.released))
      ) {
        nextReleasedGame = game;
      }
    });
    return games;
  }

  function gameCardClicked(number: number) {
    selectedGameNumber = number;
    gameDetailsDrawer.showGameDetails(number, games[number - 1]);
  }

  function playIframeGame(game: GamesResponse, gameUrl: string) {
    modalFrame.playGame(game, gameUrl);
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

<Background />

<nav class="flex justify-center w-full my-4 gap-4">
  <PillButton onClick={() => (aboutModalOpen = true)}>About</PillButton>
  <PillLink href="https://yoshiip.itch.io">itch.io</PillLink>
  <PillLink href="https://www.youtube.com/@Aymeri">
    <Youtube />
    YouTube</PillLink
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
    <p class="text-lg max-w-md">
      Making <span
        class="bg-gradient-to-br from-blue-600 to-purple-400 inline-block text-transparent bg-clip-text font-bold"
        >100 video games</span
      >, from September 2024 to December 2032 available for free!
    </p>
    {#if nextReleasedGame}
      <div class="flex flex-col items-center">
        <h3 class="text-lg font-bold">Next game in...</h3>
        <CountdownTimer targetDate={nextReleasedGame?.released} />
      </div>
    {/if}
  </div>

  {#await gamesPromise}
    <Spinner />
  {:then games}
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {#each Array.from({ length: 100 }) as _, i}
        <GameCard
          number={i + 1}
          game={games[i]}
          cardClicked={gameCardClicked}
        />
      {/each}
    </div>
  {:catch error}
    <div class="w-full flex justify-center">
      <BaseAlert>
        {error.message}
      </BaseAlert>
    </div>
  {/await}
  <div class="h-32"></div>
</main>

<footer
  class="bg-slate-200 w-full flex items-center justify-center flex-col p-4"
>
  <a href="/privacy" class="hover:underline">Privacy Policy</a>
</footer>

{#if showBackToTop}
  <div class="fixed bottom-4 right-4" transition:blur>
    <CircleButton onClick={scrollToTop}>
      <ArrowUp />
    </CircleButton>
  </div>
{/if}

<AboutModal
  closeModal={() => (aboutModalOpen = false)}
  bind:isOpen={aboutModalOpen}
/>

<GameDetailsDrawer
  bind:isOpen={isDrawerOpen}
  {playIframeGame}
  bind:this={gameDetailsDrawer}
/>

<ModalFrame bind:this={modalFrame} />
