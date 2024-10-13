<script lang="ts">
  import { X } from "lucide-svelte";
  export let buttonPressed = () => {};
</script>

<button on:click={buttonPressed} class="btn-circle">
  <X />
</button>
