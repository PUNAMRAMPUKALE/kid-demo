import { useEffect, useState } from "react";
import { fetchAttempts } from "../services/api";
import { getChildId } from "../services/child";

export default function Parent() {
  const [childId] = useState(getChildId());
  const [rows, setRows] = useState<Array<{ id: string; question: string; answer: string; correct: boolean; created_at: string }>>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!childId) { setErr("Set a Child ID in Quiz page first."); return; }
    fetchAttempts(childId).then(r => setRows(r.data)).catch(e => setErr(e.message));
  }, [childId]);

  if (err) return <div className="rounded-bubble bg-red-100 text-red-700 px-4 py-3">{err}</div>;

  return (
    <div className="rounded-bubble bg-white p-6 shadow-soft border border-skyblue/30">
      <h2 className="text-xl font-semibold text-inky mb-4">
        Attempts for <span className="font-bold">{childId || "?"}</span>
      </h2>
      <div className="overflow-auto">
        <table className="min-w-full text-left">
          <thead className="text-inky/70">
            <tr>
              <th className="py-2 pr-4">When</th>
              <th className="py-2 pr-4">Question</th>
              <th className="py-2 pr-4">Answer</th>
              <th className="py-2 pr-4">Correct</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-200/60">
                <td className="py-2 pr-4">{new Date(r.created_at).toLocaleString()}</td>
                <td className="py-2 pr-4">{r.question}</td>
                <td className="py-2 pr-4">{r.answer}</td>
                <td className="py-2 pr-4">{r.correct ? "✅" : "❌"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-inky/60">
                  No attempts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
