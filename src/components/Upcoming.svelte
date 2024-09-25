<script lang="ts">
  import { getFutureMonthYear } from "$lib/utils";

  export let number;
</script>

<button class="w-full max-w-xs h-20 relative border-gray-200 border rounded">
  <span
    class="font-bold italic opacity-25 -z-10 text-2xl absolute right-4 bottom-2 select-none"
    aria-hidden="true">{number + 1}</span
  >
  <span
    class="font-bold italic opacity-25 -z-10 text-md uppercase absolute left-4 bottom-2 select-none"
    aria-hidden="true">{getFutureMonthYear(number)}</span
  >
  <h2 class="text-2xl">Upcoming...</h2>
</button>
