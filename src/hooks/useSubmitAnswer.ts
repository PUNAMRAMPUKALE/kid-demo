import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import type { AnswerResponse } from "../models/types";

export function useSubmitAnswer() {
  return useMutation({
    mutationFn: (payload: { childId: string; question: string; answer: string }) =>
      api<AnswerResponse>("/answer", { method: "POST", body: JSON.stringify(payload) }),
  });
}
