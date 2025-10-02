import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { burst } from "../utils/confetti";

export default function Celebration({ show, onDone }: { show: boolean; onDone?: () => void }) {
  useEffect(() => {
    if (!show) return;
    burst();
    const t = setTimeout(() => onDone?.(), 1800);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-bubble bg-sunshine px-6 py-4 text-2xl font-bold text-inky shadow-soft"
            initial={{ scale: 0.8, rotate: -4 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
            🎉 Woohoo! Great job!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
