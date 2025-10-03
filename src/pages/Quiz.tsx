import { useEffect, useMemo, useState } from "react";
import BouncyButton from "../components/BouncyButton";
import CoachBubble from "../components/CoachBubble";
import { burst } from "../utils/confetti";
import { fetchNextQuestion, submitQuiz } from "../services/api";
import { getChildId, setChildId } from "../services/child";
import Celebration from "../components/Celebration";
import { playSfx } from "../sound/SoundProvider";

export default function Quiz() {
  const [childId, setChild] = useState(getChildId());
  const [question, setQuestion] = useState<{ id: string; level: number; prompt: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("Answer the question and I’ll tell you how you did! 🐼");
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (childId) void loadNext(childId);
  }, [childId]);

  async function loadNext(id: string) {
    try {
      setLoadError(null);
      const q = await fetchNextQuestion(id);
      if (!q) {
        setQuestion(null);
        setMsg("No questions found. Ask a grown-up to add some questions 🧩");
        setLoadError("No questions available for the selected level.");
        return;
      }
      setQuestion(q);
      setAnswer("");
      setMsg("Answer the question and I’ll tell you how you did! 🐼");
    } catch (e: any) {
      setQuestion(null);
      setLoadError(e?.message || "Failed to load question.");
    }
  }

  const canSubmit = useMemo(
    () => Boolean(childId.trim() && question && answer.trim()),
    [childId, question, answer]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !question) return;
    setLoading(true);
    try {
      setChildId(childId); // persist for Rewards/Parent
      const res = await submitQuiz({ childId, questionId: question.id, answer });
      setMsg(res.companionText);
      if (res.correct) {
        playSfx("success");
        burst();            // quick confetti
        setCelebrate(true); // overlay for ~1.8s
      } else {
  playSfx("failure");   // failure sound here
  
}
      // then queue next question
      setTimeout(() => {
        if (res.nextQuestion) setQuestion(res.nextQuestion);
        setAnswer("");
      }, 900);
    } catch (err: any) {
      setMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-bubble bg-milk p-6 shadow-soft border border-skyblue/40">
          <h2 className="text-xl sm:text-2xl font-semibold text-inky mb-4">Quiz Time ✍️</h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-inky/80">Child ID</label>
              <input
                className="w-full rounded-bubble border border-skyblue/50 px-4 py-3"
                value={childId}
                onChange={(e) => setChild(e.target.value)}
                placeholder="e.g. kid-123"
              />
            </div>

            <div>
              <label className="block text-inky/80">Question</label>

              {!question ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-bubble border border-skyblue/40 bg-white px-4 py-3 min-h-[52px] text-inky/60">
                    {childId ? (loadError ?? "Press ‘Load Question’ to start") : "Enter Child ID to start"}
                  </div>
                  <BouncyButton
                    type="button"
                    onClick={() => childId && loadNext(childId)}
                    disabled={!childId || loading}
                  >
                    Load Question
                  </BouncyButton>
                </div>
              ) : (
                <div className="rounded-bubble border border-skyblue/40 bg-white px-4 py-3 min-h-[52px]">
                  {question.prompt}
                </div>
              )}

              {loadError && (
                <p className="mt-2 text-sm text-red-600">
                  {loadError} — make sure your backend is running and the `questions` table has rows.
                </p>
              )}
            </div>

            <div>
              <label className="block text-inky/80">Answer</label>
              <input
                className="w-full rounded-bubble border border-skyblue/50 px-4 py-3"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="type your answer"
                disabled={!question}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <BouncyButton type="submit" disabled={!canSubmit || loading}>
                {loading ? "Checking…" : "Submit"}
              </BouncyButton>
              <BouncyButton
                type="button"
                color="bubblegum"
                onClick={() => {
                  setAnswer("");
                  setMsg("Let’s try another!");
                }}
              >
                Reset
              </BouncyButton>
            </div>
          </form>
        </div>

        <div className="rounded-bubble bg-white p-6 shadow-soft border border-grape/30">
          <CoachBubble text={msg} />
        </div>
      </div>

      {/* Celebration overlay */}
      <Celebration show={celebrate} onDone={() => setCelebrate(false)} />
    </>
  );
}
