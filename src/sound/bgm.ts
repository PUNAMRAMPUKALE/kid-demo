import { Howl, Howler } from "howler";

const LS_KEY = "kid.bgm.v1";

type Prefs = { muted: boolean; volume: number };
function load(): Prefs {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {} as any; }
}
function save(p: Prefs) { localStorage.setItem(LS_KEY, JSON.stringify(p)); }

const prefs = {
  muted: load().muted ?? true,      // default muted on first visit (good UX)
  volume: load().volume ?? 0.5,
};

let bg: Howl | null = null;
let started = false;

function ensureBgm() {
  if (bg) return bg;
  bg = new Howl({
    src: ["/sfx/bg_loop.mp3"],
    loop: true,
    volume: prefs.volume,
  });
  Howler.mute(prefs.muted);
  return bg;
}

/** Call this once (after first user gesture) to begin the loop */
export function startBgm() {
  const h = ensureBgm();
  if (!started) {
    try { h.play(); started = true; } catch {}
  }
}

/** Toggle mute and persist */
export function toggleBgmMute() {
  prefs.muted = !prefs.muted;
  Howler.mute(prefs.muted);
  save(prefs);
}

/** Set volume 0..1 and persist */
export function setBgmVolume(v: number) {
  prefs.volume = Math.max(0, Math.min(1, v));
  Howler.volume(prefs.volume);
  save(prefs);
}

export function isBgmMuted() { return prefs.muted; }
export function getBgmVolume() { return prefs.volume; }

/** Optional: stop the loop */
export function stopBgm() {
  if (bg && started) { try { bg.stop(); } catch {} }
  started = false;
}
