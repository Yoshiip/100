<script lang="ts">
  import Modal from "./Modal.svelte";

  export let isOpen = false;
  export let closeModal: () => void;

  const questions = [
    {
      title: "When will each game be released?",
      answer:
        "I will release a game every months. Probably a bit before the middle of the month, like 13th. Since some the games will be made for game jams, i will release them as soon as the jam is over.<br>You can always check the countdown to the next on this page.",
    },
    {
      title: "Can i help you?",
      answer:
        "Yes, you can! You can help me by playing the games, giving me feedbacks, sharing the games with your friends. If you have some skills in game development, you can also help me by creating assets, musics, sounds, etc. You can get in touch with me at the mail below.",
    },
    {
      title: "What engines are you using?",
      answer:
        "I will try to use as many engines as possible. I'am very good with Godot so i will stick with it for most games.",
    },
    {
      title: "How many times do you spend on each game?",
      answer: "It will depend on the free time i have. ",
    },
  ];
</script>

<Modal bind:isOpen bind:closeModal>
  <h4 class="text-2xl font-bold text-slate-800 mt-6 mb-3">About this</h4>
  <p>
    Welcome to the home page of the Aymeri's 100. This is a challenge that i've
    gave to myself in September 2024 to build 100 complete video games from
    scratch.
  </p>
  <h4 class="text-xl font-bold text-slate-600 mt-6 mb-3">FAQ</h4>
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

  <p>
    These games will be all frees, available on desktop (web primarly, but
    Windows/MacOS/Linux if not possible)
  </p>
  <h4 class="text-xl font-bold text-slate-600 mt-6 mb-3">Contact</h4>
  <p>If you want to contact me, you can reach me at:</p>
  <p>contact@aymeri.dev</p>
</Modal>
