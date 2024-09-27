<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let targetDate = "";
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  let interval: any;

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const end = new Date(targetDate).getTime();
    const timeRemaining = end - now;

    if (timeRemaining >= 0) {
      days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    } else {
      clearInterval(interval);
    }
  }

  onMount(() => {
    calculateTimeRemaining(); // Initialise les valeurs au chargement

    interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="flex space-x-4 text-2xl bg-slate-100 border border-slate-400 rounded-full w-min px-6"
>
  <div class="flex flex-col items-center">
    <span class="font-bold" transition:fly={{ y: 10, duration: 500 }}
      >{days}</span
    >
    <span class="text-sm">days</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold" transition:fly={{ y: 10, duration: 500 }}
      >{hours}</span
    >
    <span class="text-sm">hours</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold" transition:fly={{ y: 10, duration: 500 }}
      >{minutes}</span
    >
    <span class="text-sm">minutes</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold" transition:fly={{ y: 10, duration: 500 }}
      >{seconds}</span
    >
    <span class="text-sm">seconds</span>
  </div>
</div>
