<script lang="ts">
  import { X } from "lucide-svelte";
  export let buttonPressed = () => {};
</script>

<button
  on:click={buttonPressed}
  class="absolute top-4 right-4 px-2 py-2 bg-slate-200 hover:bg-red-100 text-red-500 rounded-full active:scale-95 transition-all"
>
  <X />
</button>
