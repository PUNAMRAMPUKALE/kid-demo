import { useEffect, useState } from "react";
import { fetchRewards } from "../services/api";
import { getChildId } from "../services/child";

export default function Rewards() {
  const [childId] = useState(getChildId());
  const [data, setData] = useState<{ points: number; streak: number; best_streak: number; badges: string[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!childId) { setErr("Set a Child ID in Quiz page first."); return; }
    fetchRewards(childId).then(setData).catch(e => setErr(e.message));
  }, [childId]);

  if (err) return <div className="rounded-bubble bg-red-100 text-red-700 px-4 py-3">{err}</div>;
  if (!data) return <div className="text-inky/70">Loading rewards…</div>;

  return (
    <div className="grid gap-6">
      <div className="rounded-bubble bg-milk p-6 shadow-soft border border-sunshine/40">
        <h2 className="text-xl font-semibold text-inky mb-2">Your Rewards 🎁</h2>
        <div className="flex flex-wrap gap-6">
          <Stat label="Points" value={data.points} />
          <Stat label="Streak" value={data.streak} />
          <Stat label="Best Streak" value={data.best_streak} />
        </div>
      </div>
      <div className="rounded-bubble bg-white p-6 shadow-soft border border-grape/30">
        <h3 className="text-lg font-semibold text-inky mb-3">Badges 🏅</h3>
        {data.badges.length === 0 && <p className="text-inky/70">No badges yet—keep going!</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.badges.map((b) => (
            <div key={b} className="rounded-bubble bg-skyblue/20 border border-skyblue/50 px-4 py-3 text-inky text-center shadow-soft">{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-bubble bg-white px-5 py-4 border border-skyblue/40 shadow-soft">
      <div className="text-inky/70 text-sm">{label}</div>
      <div className="text-2xl font-bold text-inky">{value}</div>
    </div>
  );
}
