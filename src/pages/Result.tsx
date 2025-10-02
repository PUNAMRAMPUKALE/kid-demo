import { useSearch } from "@tanstack/react-router";
import CoachBubble from "../components/CoachBubble";
import BouncyButton from "../components/BouncyButton";
import { Link } from "@tanstack/react-router";

export default function Result() {
  const { correct, msg } = useSearch({ from: "/result" }) as { correct?: string; msg?: string };
  const isCorrect = correct === "true";
  return (
    <div className="max-w-3xl mx-auto rounded-bubble bg-white p-6 shadow-soft border border-skyblue/30">
      <div className={`rounded-bubble px-4 py-3 text-lg font-semibold mb-4
        ${isCorrect ? "bg-leaf/90 text-inky" : "bg-bubblegum/80 text-inky"}`}>
        {isCorrect ? "✅ Correct!" : "❌ Not yet, keep trying!"}
      </div>
      <CoachBubble text={msg || (isCorrect ? "Great job!" : "Give it another go!")} />
      <div className="mt-6 flex gap-3">
        <Link to="/quiz"><BouncyButton color="leaf">Try another</BouncyButton></Link>
        <Link to="/rewards"><BouncyButton color="sunshine">See rewards</BouncyButton></Link>
      </div>
    </div>
  );
}
