export type AnswerResponse = {
  correct: boolean;
  companionText: string;
};
export type Attempt = {
  id: string;
  child_id: string;
  question: string;
  answer: string;
  correct: boolean;
  created_at?: string;
};
