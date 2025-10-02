import { motion, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type Color = "leaf" | "bubblegum" | "sunshine" | "grape";

type Props = PropsWithChildren<
  HTMLMotionProps<"button"> & {
    color?: Color;
  }
>;

const colorToBg: Record<Color, string> = {
  leaf: "bg-leaf",
  bubblegum: "bg-bubblegum/80",
  sunshine: "bg-sunshine",
  grape: "bg-grape/80",
};

export default function BouncyButton({
  color = "leaf",
  className,
  disabled,
  children,
  ...rest
}: Props) {
  const base =
    "rounded-bubble px-6 py-3 font-semibold text-inky shadow-soft transition focus:outline-none focus:ring-4 focus:ring-skyblue/40";
  const enabled = `${colorToBg[color]} hover:translate-y-[-2px] active:translate-y-0`;
  const disabledCls = "bg-gray-300 cursor-not-allowed opacity-70";

  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled ? undefined : { y: 0, scale: 0.98 }}
      className={`${base} ${disabled ? disabledCls : enabled} ${className ?? ""}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
