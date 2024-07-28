"use client";
import React, { useMemo } from "react";
import { motion, Variants, Transition } from "framer-motion";

type FadeTextProps = {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  framerProps?: {
    initial?: Variants["initial"];
    animate?: Variants["animate"];
    exit?: Variants["exit"];
    transition?: Transition;
  };
  text: string;
};

export function FadeText({
  direction = "up",
  className,
  framerProps = {},
  text,
}: FadeTextProps) {
  const directionOffset = useMemo(() => {
    const map = { up: 50, down: -50, left: -50, right: 50 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const FADE_ANIMATION_VARIANTS: Variants = useMemo(() => {
    return {
      initial: {
        opacity: 0,
        [axis]: directionOffset,
        ...framerProps.initial,
      },
      animate: {
        opacity: 1,
        [axis]: 0,
        ...framerProps.animate,
      },
      exit: {
        opacity: 0,
        [axis]: -directionOffset,
        ...framerProps.exit,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FADE_ANIMATION_VARIANTS}
      transition={framerProps.transition || { type: "spring", duration: 0.5 }}
    >
      <motion.span className={className}>{text}</motion.span>
    </motion.div>
  );
}
