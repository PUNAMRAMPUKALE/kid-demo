const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Quiz endpoints */
export async function fetchNextQuestion(childId: string, level = 1) {
  // returns the question object itself (not { data: ... })
  return api<{ id: string; level: number; prompt: string }>(
    `/quiz/next?childId=${encodeURIComponent(childId)}&level=${level}`
  );
}

export async function submitQuiz(payload: { childId: string; questionId: string; answer: string }) {
  return api<{
    correct: boolean;
    companionText: string;
    rewards: { points: number; streak: number; best_streak: number; badges: string[] };
    nextQuestion: { id: string; level: number; prompt: string } | null;
  }>(`/quiz/answer`, { method: "POST", body: JSON.stringify(payload) });
}

/** Rewards endpoint */
export async function fetchRewards(childId: string) {
  return api<{ points: number; streak: number; best_streak: number; badges: string[] }>(
    `/rewards/${encodeURIComponent(childId)}`
  );
}

/** Parent endpoint */
export async function fetchAttempts(childId: string) {
  return api<{ data: Array<{ id: string; question: string; answer: string; correct: boolean; created_at: string }> }>(
    `/parent/attempts?childId=${encodeURIComponent(childId)}`
  );
}
