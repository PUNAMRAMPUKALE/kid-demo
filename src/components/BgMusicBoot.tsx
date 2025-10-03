import { useEffect } from "react";
import { startBgm } from "../sound/bgm";

/**
 * Mount once in App.
 * Starts background music after the first pointer/touch (autoplay policy).
 */
export default function BgMusicBoot() {
  useEffect(() => {
    const onFirst = () => startBgm();
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, []);
  return null;
}
