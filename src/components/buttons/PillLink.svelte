<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  target="_blank"
  class="bg-white rounded-full p-2 hover:bg-slate-100 active:scale-95 border hover:border-slate-300 transition-all shadow-md flex gap-4 px-4"
  ><slot /></a
>
