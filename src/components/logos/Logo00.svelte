<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  const HEIGHT = 100;
  const EYE_ASPECT_RATIO = 0.85;
  const WIDTH = 184;
  let canvas: HTMLCanvasElement;
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId: number;

  let ctx: CanvasRenderingContext2D;

  onMount(() => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // draw eyes every frame
    function draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawEye((HEIGHT * EYE_ASPECT_RATIO) / 2, HEIGHT / 2);
      drawEye(WIDTH - (HEIGHT * EYE_ASPECT_RATIO) / 2, HEIGHT / 2);
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    // Cleanup function to cancel animation and remove listeners
    onDestroy(() => {
      cancelAnimationFrame(animationFrameId);
    });
  });

  function drawEye(x: number, y: number): void {
    // Draw the eye
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.ellipse(
      x,
      y,
      (HEIGHT / 2) * EYE_ASPECT_RATIO,
      HEIGHT / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Calculate the angle and position of the pupil
    const dx = mouseX - x;
    const dy = mouseY - y;
    const angle = Math.atan2(dy, dx);

    const eyeX = x + Math.cos(angle) * HEIGHT * 0.2; // Adjusted factor for more natural eye movement
    const eyeY = y + Math.sin(angle) * HEIGHT * EYE_ASPECT_RATIO * 0.2;

    // Draw the pupil
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, (HEIGHT / 4) * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Update mouse position relative to the canvas
  function updateMousePosition(event: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }
</script>

<svelte:window on:mousemove={updateMousePosition} />

<div class="flex gap-4">
  <img src="one.svg" width={HEIGHT / 2} height={HEIGHT} alt="Digit 1" />
  <canvas bind:this={canvas} width={WIDTH} height={HEIGHT}></canvas>
</div>
