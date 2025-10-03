import { Howl } from "howler";

type SoundKey = "success" | "failure";

export const sfx: Record<SoundKey, Howl> = {
  success: new Howl({ src: ["/sfx/success.mp3"], volume: 1 }),
  failure: new Howl({ src: ["/sfx/fail.mp3"], volume: 1 }),
};

// Utility function to safely play a sound effect
export function playSfx(name: SoundKey) {
  sfx[name]?.play();
}
