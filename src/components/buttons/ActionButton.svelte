<script lang="ts">
  import {
    type ActionsResponse,
    ActionsTypeOptions,
  } from "$lib/pocketbase-types";
  import { Github, Globe, Monitor, Play, Youtube } from "lucide-svelte";
  import Apple from "lucide-svelte/icons/apple";
  import Smartphone from "lucide-svelte/icons/smartphone";

  export let action: ActionsResponse;
  export let gameName: string;
  export let toggleIframe: (url: string) => void;
</script>

<a
  href={action.type !== ActionsTypeOptions.iframe ? action.url : "#"}
  target={action.type === ActionsTypeOptions.iframe ? "_self" : "_blank"}
  on:click={() => {
    if (action.type === ActionsTypeOptions.iframe) {
      toggleIframe(action.url);
    }
  }}
  class="flex-1 bg-blue-500 border-b-8 border-blue-700 hover:bg-blue-400 hover:border-blue-600 active:bg-blue-600 active:border-blue-700 active:border-b text-white border rounded transition-all font-bold text-xl p-3 flex flex-row gap-2 items-center justify-center"
>
  {#if action.text !== ""}
    {action.text}
  {:else if action.type == ActionsTypeOptions.iframe}
    <Play />
    Play {gameName}
  {:else if action.type == ActionsTypeOptions.link}
    {#if action.url.includes("itch.io")}
      Play {gameName} on itch.io
    {:else if action.url.includes("github.com")}
      <Github />
      View source code
    {:else if action.url.includes("youtube.com")}
      <Youtube />
      Watch on YouTube
    {:else}
      Visit {gameName}
    {/if}
  {:else if action.type == ActionsTypeOptions.web}
    <Globe />
    Play {gameName} online
  {:else if action.type == ActionsTypeOptions.win}
    <Monitor />
    Download {gameName} for Windows
  {:else if action.type == ActionsTypeOptions.mac}
    <Apple />
    Download {gameName} for Mac
  {:else if action.type == ActionsTypeOptions.linux}
    <Monitor />
    Download {gameName} for Linux
  {:else if action.type == ActionsTypeOptions.mobile}
    <Smartphone />
    Download {gameName} for mobile
  {/if}
</a>
