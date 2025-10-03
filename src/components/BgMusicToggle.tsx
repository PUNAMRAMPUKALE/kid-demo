import { useEffect, useState } from "react";
import { getBgmVolume, isBgmMuted, setBgmVolume, startBgm, toggleBgmMute } from "../sound/bgm";

type Props = {
  className?: string; // allow placement override
};

export default function BgMusicToggle({ className = "" }: Props) {
  const [muted, setMuted] = useState(isBgmMuted());
  const [vol, setVol] = useState(getBgmVolume());

  function handleToggle() {
    startBgm();
    toggleBgmMute();
    setMuted(isBgmMuted());
  }
  function handleVol(v: number) {
    startBgm();
    setBgmVolume(v);
    setVol(getBgmVolume());
  }

  useEffect(() => {
    setMuted(isBgmMuted());
    setVol(getBgmVolume());
  }, []);

  return (
    <div
      className={[
        // moved to bottom-right and slightly lower z-index than menus
        "fixed bottom-4 right-4 z-40",
        "flex items-center gap-2 rounded-bubble bg-white/85 backdrop-blur px-3 py-2",
        "shadow-soft border border-slate-200",
        className,
      ].join(" ")}
    >
      <button
        onClick={handleToggle}
        className="rounded-full px-3 py-1 text-sm font-semibold border border-slate-300 hover:shadow"
        title={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? "🔇 BGM" : "🔊 BGM"}
      </button>
      <input
        type="range"
        min={0} max={1} step={0.05}
        value={vol}
        onChange={(e) => handleVol(parseFloat(e.target.value))}
        className="accent-violet-500"
        aria-label="Background music volume"
      />
    </div>
  );
}
