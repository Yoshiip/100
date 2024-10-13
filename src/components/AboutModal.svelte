<script lang="ts">
  import { CircleHelp, Mail, X } from "lucide-svelte";
  import SupportButton from "./buttons/SupportButton.svelte";
  import Modal from "./Modal.svelte";
  import CircleButton from "./buttons/CircleButton.svelte";

  export let isOpen = false;
  export let closeModal: () => void;

  const questions = [
    {
      title: "When will each game be released?",
      answer:
        "I will release a game every month, probably a bit before the middle of the month, around the 13th. Since some of the games will be made for game jams, I will release them as soon as the jam is over.<br>You can always check the countdown for the next release on this page.",
    },
    {
      title: "Can I help you?",
      answer:
        "Yes! If you have any skills in making things (coding, music, art, writing, etc.), feel free to get in touch with me via the email below. (You will of course be credited for your work)",
    },
    {
      title: "What engines are you using?",
      answer:
        "I will try to use as many engines as possible. I'm very experienced with Godot, so I'll stick with it for most games.",
    },
  ];
</script>

<Modal bind:isOpen bind:closeModal>
  <div class="absolute top-4 gap-2 flex left-4 right-4">
    <div class="flex-1" />
    <CircleButton onClick={closeModal}>
      <X />
    </CircleButton>
  </div>
  <h4 class="text-2xl flex-1 font-bold text-slate-800 mt-6 mb-3">About this</h4>

  <p>
    Welcome to the home page of Aymeri's 100. This is a challenge I set for
    myself in September 2024 to build 100 complete video games from scratch.
  </p>
  <p>
    All these games will be free and available on desktop (primarily web, but
    also Windows/MacOS/Linux if web isn't possible).
  </p>
  <div class="flex pt-4 w-full justify-center">
    <SupportButton />
  </div>
  <h4
    class="text-xl font-bold text-slate-600 mt-6 mb-3 flex gap-2 items-center"
  >
    <CircleHelp />
    FAQ
  </h4>
  <div class="flex flex-col gap-2">
    {#each questions as { title, answer }}
      <details
        class="border border-slate-200 rounded transition-shadow hover:shadow-sm cursor-pointer"
      >
        <summary class="font-bold p-2 d">{title}</summary>
        <p>{@html answer}</p>
      </details>
    {/each}
  </div>

  <h4
    class="text-xl font-bold text-slate-600 mt-6 mb-3 flex gap-2 items-center"
  >
    <Mail />
    Contact
  </h4>
  <p>If you'd like to contact me, you can reach me at:</p>
  <pre class="text-slate-700">contact@aymeri100.fr</pre>
</Modal>
