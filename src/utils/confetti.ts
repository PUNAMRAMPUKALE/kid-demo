import confetti from "canvas-confetti";

/** Small celebratory confetti burst (≈400ms). */
export function burst(): void {
  const end = Date.now() + 400;
  const colors = ["#7AD08D", "#8DD3FF", "#FFD166", "#FF8DC7", "#A78BFA"];
  (function frame() {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors,
      scalar: 0.9,
      ticks: 120,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
