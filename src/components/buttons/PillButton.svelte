<script lang="ts">
  export let onClick: () => void;
</script>

<button
  class="bg-white rounded-full p-2 hover:bg-slate-100 active:scale-95 border hover:border-slate-300 transition-all shadow-md flex gap-4 px-4"
  on:click={onClick}><slot /></button
>
