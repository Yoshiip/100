<script lang="ts">
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  class="px-2 py-2 bg-slate-200 border border-slate-300 active:shadow-inner hover:bg-red-100 hover:border-b-4 hover:border-red-200 active:border-b-2 text-red-500 rounded-full active:scale-95 active:bg-red-200 active:border-red-500 transition-all"
>
  <slot />
</button>
