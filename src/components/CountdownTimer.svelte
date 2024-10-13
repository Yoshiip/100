<script lang="ts">
  import { BellPlus } from "lucide-svelte";
  import { onMount } from "svelte";
  import CircleButton from "./buttons/CircleButton.svelte";

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
    calculateTimeRemaining();

    interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="flex space-x-4 text-2xl bg-slate-100 border border-slate-400 rounded-full w-min px-6 items-center justify-center"
>
  <div class="flex flex-col items-center">
    <span class="font-bold">{days}</span>
    <span class="text-sm">days</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold">{hours}</span>
    <span class="text-sm">hours</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold">{minutes}</span>
    <span class="text-sm">minutes</span>
  </div>
  <div class="flex flex-col items-center">
    <span class="font-bold">{seconds}</span>
    <span class="text-sm">seconds</span>
  </div>
</div>
