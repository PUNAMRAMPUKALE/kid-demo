import { motion } from "framer-motion";
import bird from "../assets/mascots/bird-blue.png";
import cat from "../assets/mascots/cat-orange.png";
import dino from "../assets/mascots/dino-green.png";
import fox from "../assets/mascots/fox-red.png";
import panda from "../assets/mascots/panda.png";

const defaultMascots = [bird, cat, dino, fox, panda];

type Props = { images?: string[] };

export default function MascotParade({ images = defaultMascots }: Props) {
  return (
    <div className="pointer-events-none select-none relative w-full overflow-hidden py-4">
      <div className="flex gap-6 sm:gap-10 items-center">
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="friend"
            onError={(e) => {
              // fallback if a file is missing
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>🦊</text></svg>";
            }}
            className="h-10 sm:h-14 md:h-16 drop-shadow"
            initial={{ y: 12, rotate: -2, opacity: 0 }}
            animate={{ y: [12, -6, 12], rotate: [-2, 2, -2], opacity: 1 }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
