<script lang="ts">
  import type { GamesResponse } from "$lib/pocketbase-types";
  import { CalendarClock, X } from "lucide-svelte";
  import CountdownTimer from "./CountdownTimer.svelte";
  import {
    gameNotReleased,
    gameReleased,
    getFutureMonthYear,
  } from "$lib/utils";
  import { fade, fly } from "svelte/transition";
  import { pb } from "$lib/pocketbase";
  import CircleButton from "./buttons/CircleButton.svelte";
  import ActionButton from "./buttons/ActionButton.svelte";
  import Spinner from "./Spinner.svelte";
  import BaseAlert from "./alerts/BaseAlert.svelte";

  let number = 0;
  export let isOpen = false;
  export let playIframeGame = (game: GamesResponse, gameUrl: string) => {};

  let promise: Promise<GamesResponse | undefined>;

  async function fetchGameDetails() {
    const game = await pb
      .collection("games")
      .getFirstListItem(`number=${number}`, {
        expand: "tool,actions",
      });

    return game;
  }

  export async function showGameDetails(
    cardNumber: number,
    game: GamesResponse | undefined
  ) {
    isOpen = true;

    if (gameReleased(game)) {
      number = game?.number;
      promise = fetchGameDetails();
    } else {
      if (game === undefined) {
        number = cardNumber;
      }
      promise = Promise.resolve(game);
    }
  }
</script>

{#if isOpen}
  <div
    on:scroll={() => (isOpen = false)}
    class="fixed inset-0 bg-black bg-opacity-50"
    on:click={() => (isOpen = false)}
    role="presentation"
    transition:fade={{ duration: 150 }}
  />

  <!-- Drawer -->
  <div
    class="fixed top-0 right-0 h-full overflow-y-auto w-full max-w-xl bg-white shadow-lg"
    transition:fly={{ x: 100, duration: 150 }}
  >
    {#await promise}
      <Spinner />
    {:then game}
      {#if gameReleased(game)}
        <div class="w-full aspect-video relative">
          <figure>
            <img
              src={pb.files.getUrl(game, game.cover)}
              aria-hidden="true"
              alt="Game Cover"
            />
          </figure>

          {#if game.expand.tool}
            <div>
              <img
                src={pb.files.getUrl(
                  game.expand?.tool,
                  game.expand.tool.icon ?? ""
                )}
                alt=""
              />
            </div>
          {/if}
        </div>
        <div class="flex flex-col h-full p-4">
          <div class="flex-1 p-6 gap-4">
            <div class="flex text-slate-600">
              <span class="font-bold italic text-md uppercase"
                >{getFutureMonthYear(number)}</span
              >
              <div class="flex-1" />
              <span class="font-bold italic text-2xl select-none">1</span>
            </div>
            <h2 class="text-3xl font-semibold mb-2">{game?.name}</h2>
            <h5 class="text-xs uppercase tracking-wider text-slate-400 mb-6">
              {game?.subtitle}
            </h5>
            <div class="prose"></div>
            <div
              class="modal-content prose prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-p:mb-4 prose-ul:ml-6 prose-li:mb-2 prose-strong:font-bold"
            >
              {@html game.description}
            </div>

            {#if game.actions.length > 0}
              <div class="sticky bottom-4 left-4 right-4 w-full flex gap-4">
                {#each game.expand.actions as action}
                  <ActionButton
                    gameName={game.name}
                    {action}
                    toggleIframe={() => playIframeGame(game, action.url)}
                  ></ActionButton>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <div class="flex flex-col justify-center mt-16 items-center m-4 p-4">
          <CalendarClock size="2rem" class="text-slate-400" />
          <h4 class="text-lg text-slate-800">This game is not released yet.</h4>
          {#if gameNotReleased(game)}
            <CountdownTimer targetDate={game.released} />
          {:else}
            <h4 class="text-xl font-bold">{getFutureMonthYear(number)}</h4>
          {/if}
        </div>
      {/if}
      <div class="absolute top-4 gap-2 flex left-4 right-4">
        <div class="flex-1" />
        <CircleButton onClick={() => (isOpen = false)}>
          <X />
        </CircleButton>
      </div>
    {:catch error}
      <BaseAlert>{error.message}</BaseAlert>
    {/await}
  </div>
{/if}
