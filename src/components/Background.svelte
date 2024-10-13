<div
  class="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(210,100%,100%,0)_0,rgba(173,216,230,0.5)_100%)] animate-pulse-gradient"
></div>

<style>
  @keyframes pulse-gradient {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-pulse-gradient {
    animation: pulse-gradient 4s infinite ease-in-out;
  }
</style>
