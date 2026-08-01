"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type RandomLetterSwapProps = {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: {
    duration?: number;
    type?: string;
    [key: string]: any;
  };
  onClick?: () => void;
};

const glitchVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const RandomLetterSwap = ({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
  onClick,
}: RandomLetterSwapProps) => {
  const letters = useMemo(() => label.split(""), [label]);

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileHover="visible"
      onClick={onClick}
    >
      <AnimatePresence mode="popLayout">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={glitchVariants}
            transition={{
              ...transition,
              delay: index * staggerDuration,
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.span>
  );
};
