<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let isOpen = false;
  export let closeModal;

  const handleClose = () => {
    closeModal();
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 transition-opacity flex items-center justify-center"
    transition:fade={{ duration: 150 }}
    on:click|self={handleClose}
    on:keydown={handleKeyDown}
    role="presentation"
  >
    <div
      class="bg-white rounded-lg p-6 mx-auto transform transition-all max-w-xl max-h-full"
      transition:fly={{ y: -100, duration: 150 }}
    >
      <slot />
    </div>
  </div>
{/if}
