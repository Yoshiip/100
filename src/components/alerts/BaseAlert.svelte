<script lang="ts">
  import { X } from "lucide-svelte";
</script>

<div
  class="border border-red-600 text-red-900 max-w-md p-4 bg-red-100 rounded flex items-center justify-center flex-col"
>
  <X class="animate-bounce" />
  <slot />
</div>
