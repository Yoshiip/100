<script lang="ts">
  import { URL } from "$lib/pocketbase";
  import { onMount } from "svelte";

  let totalSupport = 0;
  let progress = 0;

  function handleClick() {
    if (progress < 100) {
      progress += 5;
    }
  }

  onMount(() => {
    fetch(`${URL}/counter`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          totalSupport = data.total_support;
        });
      }
    });
  });
</script>

<button
  class="relative w-64 h-12 bg-gray-200 rounded-full overflow-hidden text-center text-lg font-bold text-gray-800 hover:shadow active:scale-95 transition-all ease-in-out"
  on:click={handleClick}
>
  <div
    class="absolute inset-0 bg-pink-300 transition-all duration-300"
    style="width: {progress}%"
  ></div>

  <span class="relative z-10">
    {#if progress >= 100}
      Thank you! 🎉
    {:else if progress >= 80}
      Just a little more... 🏃
    {:else if progress >= 60}
      Almost there! 🏃
    {:else if progress >= 40}
      Keep going! 🏃
    {:else if progress >= 20}
      You can do it! 💪
    {:else}
      Give me strength! 💪
    {/if}
  </span>
</button>
