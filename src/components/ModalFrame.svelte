<script lang="ts">
  import { fade, fly } from "svelte/transition";

  import { Fullscreen, X } from "lucide-svelte";
  import type { GamesResponse } from "$lib/pocketbase-types";
  import CircleButton from "./buttons/CircleButton.svelte";

  let game: GamesResponse | undefined;
  let url: string;
  let iframeElement: HTMLIFrameElement | null = null;

  export function playGame(newGame: GamesResponse, gameUrl: string) {
    game = newGame;
    url = gameUrl;
  }

  function closeModal() {
    game = undefined;
  }

  function enterFullscreen() {
    if (iframeElement && iframeElement.requestFullscreen) {
      iframeElement.requestFullscreen();
    }
  }
</script>

{#if game}
  <h2>BONJOUR</h2>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 transition-opacity flex items-center justify-center"
    role="presentation"
    transition:fade={{ duration: 150 }}
  >
    <div
      class="bg-white rounded-lg p-6 mx-auto transform transition-all"
      transition:fly={{ y: -100, duration: 150 }}
    >
      <div class="flex gap-2 h-12 items-center justify-center">
        <div class="flex-1 gap-4">
          <span class="text-lg font-bold text-slate-700">
            {game.name}
          </span>
          <span class="font-mono text-lg text-slate-500">
            {game.number}
          </span>
        </div>

        <div class="h-min">
          <CircleButton onClick={enterFullscreen}>
            <Fullscreen />
          </CircleButton>
        </div>
        <div class="h-min">
          <CircleButton onClick={closeModal}>
            <X />
          </CircleButton>
        </div>
      </div>
      <iframe
        bind:this={iframeElement}
        src={url}
        frameborder="0"
        title={game.name}
        width="800"
        height="640"
      />
    </div>
  </div>
{/if}
