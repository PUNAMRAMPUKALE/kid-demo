import { motion } from "framer-motion";
import fox from "../assets/mascots/fox-red.png";

type Props = { text: string; avatarSrc?: string };

export default function CoachBubble({ text, avatarSrc = fox }: Props) {
  return (
    <div className="flex items-start gap-3">
      <motion.img
        src={avatarSrc}
        alt="coach"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>🦊</text></svg>";
        }}
        className="h-14 w-14"
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
      />
      <motion.div
        className="rounded-bubble bg-skyblue/30 border border-skyblue/60 px-4 py-3 shadow-soft text-inky"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {text}
      </motion.div>
    </div>
  );
}
