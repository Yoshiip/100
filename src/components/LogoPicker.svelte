<script lang="ts">
  const logos = import.meta.glob("./logos/Logo*.svelte");

  let logoComponents: { [key: string]: any } = {};

  Object.keys(logos).forEach((key) => {
    logos[key]().then((module: any) => {
      logoComponents[key] = module.default;
    });
  });
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-xl p-16 text-white"
>
  <h1 class="text-2xl font-bold">Logos</h1>
  <div class="grid grid-cols-2 gap-4">
    {#each Object.keys(logoComponents) as key}
      <div class="flex flex-col items-center gap-2">
        <div>
          <svelte:component this={logoComponents[key]} />
        </div>
      </div>
    {/each}
  </div>
</div>
