<script>
  export let isOpen = false;
  export let closeModal;

  const handleClose = () => {
    closeModal();
  };
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center"
    role="presentation"
    on:click={handleClose}
  >
    <!-- Le contenu de la modal -->
    <div
      class="bg-white rounded-lg p-6 w-full max-w-lg mx-auto transform transition-all"
      on:click|stopPropagation
    >
      <div class="text-right">
        <button
          class="text-gray-400 hover:text-gray-600"
          on:click={handleClose}
        >
          &times;
        </button>
      </div>
      <slot />
    </div>
  </div>
{/if}
