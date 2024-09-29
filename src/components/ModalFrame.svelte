<script lang="ts">
  import { fade, fly } from "svelte/transition";

  import type { GamesRecord } from "$lib/pocketbase-types";
  import { Fullscreen, X } from "lucide-svelte";
  import Modal from "./Modal.svelte";
  import ModalCloseButton from "./modals/ModalCloseButton.svelte";
  export let isOpen = false;

  export let game: GamesRecord;
  let iframeElement: HTMLIFrameElement | null = null;

  function closeModal() {
    isOpen = false;
  }

  function enterFullscreen() {
    if (iframeElement && iframeElement.requestFullscreen) {
      iframeElement.requestFullscreen();
    }
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 transition-opacity flex items-center justify-center"
    role="presentation"
    transition:fade={{ duration: 150 }}
  >
    <div
      class="bg-white rounded-lg p-6 mx-auto transform transition-all"
      transition:fly={{ y: -100, duration: 150 }}
    >
      <div class="flex gap-2">
        <span class="flex-1">
          {game.name}
        </span>
        <button
          on:click={enterFullscreen}
          class="px-2 py-2 bg-blue-200 hover:bg-blue-100 text-blue-500 rounded-full active:scale-95 transition-all"
        >
          <Fullscreen />
        </button>
        <button
          on:click={closeModal}
          class="px-2 py-2 bg-red-200 hover:bg-red-100 text-red-500 rounded-full active:scale-95 transition-all"
        >
          <X />
        </button>
      </div>
      <iframe
        bind:this={iframeElement}
        src={game.link}
        frameborder="0"
        title="Game"
        width="800"
        height="640"
      />
    </div>
  </div>
{/if}
