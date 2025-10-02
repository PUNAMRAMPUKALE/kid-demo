import CoachBubble from "../components/CoachBubble";
import BouncyButton from "../components/BouncyButton";
import { Link } from "@tanstack/react-router";

export default function Landing() {
  return (
    <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2 items-center">
      <div className="rounded-bubble bg-milk p-6 shadow-soft border border-skyblue/40">
        <h2 className="text-2xl font-semibold text-inky mb-3">Welcome, Explorer! 🌟</h2>
        <p className="text-inky/80">
          Learn by answering questions. Earn rewards, meet cute animal friends, and have fun!
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/quiz">
            <BouncyButton color="leaf">Start Quiz</BouncyButton>
          </Link>
          <Link to="/rewards">
            <BouncyButton color="sunshine">See Rewards</BouncyButton>
          </Link>
        </div>
      </div>
      <div className="rounded-bubble bg-white p-6 shadow-soft border border-grape/30">
        <CoachBubble text="Pick ‘Start Quiz’ and I’ll cheer you on! 🦊" />
      </div>
    </div>
  );
}
